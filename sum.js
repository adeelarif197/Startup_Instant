const getFileExtention
    = (filename) => filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

let r = getFileExtention("file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.50.225-StartupInstantApp/ImagePicker/72e00d35-d1ab-4372-9ddb-ae2b207cd9f0.jpg")

console.log(r)