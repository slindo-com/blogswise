const AWS = require('aws-sdk')
const zlib = require('zlib')

const s3 = new AWS.S3({
    'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
    'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
    'region': 'us-east-1'
})

let aws = {
  s3: {}
}


aws.s3.createBucket = async name =>
  new Promise(async (resolve, reject) => {

    await s3.createBucket({
      Bucket: name,
      ACL: 'public-read'
    }).promise().catch(err => reject(err))

    await s3.putBucketWebsite({
      Bucket: name,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: 'error.html'
        },
        IndexDocument: {
          Suffix: 'index.html'
        }
      }
    }).promise().catch(err => reject(err))


    await s3.putBucketPolicy({
      "Version": "2012-10-17",
      "Statement": [{
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "s3:GetObject"
        ],
        "Resource": [
          "arn:aws:s3:::slindo-blog/*"
        ]}
      ]
    }).promise().catch(err => reject(err))

    resolve()
  })


aws.s3.emptyBucket = async name =>
  new Promise(async (resolve, reject) => {


    const data = await s3.listObjects({
      Bucket: name
    }).promise().catch(err => reject(err))

    await Promise.all(
      data.Contents.map(val => 
        aws.s3.deleteObject(name, val.Key)
      )
    ).catch(err => reject(err))

    resolve()
  })


aws.s3.deleteObject = async (bucket, key) =>
  new Promise((resolve, reject) => {
    s3.deleteObject({ 
      Bucket: bucket,
      Key: key
    }).promise().catch(err => reject(err))
  })


aws.s3.deleteBucket = async bucket =>
  new Promise((resolve, reject) => {

    s3.deleteBucket({
      Bucket: bucket
    }).promise().catch(err => reject(err))

    resolve()
  })


aws.s3.putObject = async (bucket, key, content, contentType = 'text/html') =>
  new Promise((resolve, reject) => {

    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: zlib.gzipSync(content),
      ContentType: contentType,
      ContentEncoding: 'gzip'
    }).promise().catch(err => reject(err))

    resolve()
  })


exports.aws = aws