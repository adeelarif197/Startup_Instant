// export const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";
// export const API_BASE_URL = "http://192.168.1.2:8000/api/v1/";
export const API_BASE_URL = "https://api.startupinstant.com/api/v1/";


// api for getting url previews
export const API_LINK_PREVIEW = "http://api.linkpreview.net/?key=ca0ec1e288cd1a3e4352d2d786b2d104&q=%URL";

// REGEX
export const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

// Valid Post create things
export const VALID_IMAGE_FORMATS = ['png', 'jpg', 'jpeg', 'gif']
export const VALID_VIDEO_FORMATS = ['mp4', '3gp', 'mov']


export const postTypes = [
    {name:"NORMAL",value:"Normal Post", icon:null},
    {name:"NEWS",value:"News", icon:require('../../assets/post_types/news.png')},
    {name:"PITCH",value:"Pitch", icon:require('../../assets/post_types/pitch.jpeg')},
    {name:"JOB",value:"Job", icon:require('../../assets/post_types/job.jpg')},
    {name:"EVENT",value:"Event", icon:require('../../assets/post_types/event.jpg')},
    {name:"PROMOTION",value:"Promotion", icon:require('../../assets/post_types/promotion.png')},
    {name:"DEAL",value:"Deal", icon:require('../../assets/post_types/deal.png')},
    {name:"DISCUSSION",value:"Discussion", icon:require('../../assets/post_types/discussion.png')},
    {name:"FUNDRAISING",value:"Fund Raising", icon:require('../../assets/post_types/fundraising.png')},
    {name:"ROOM",value:"Room", icon:require('../../assets/post_types/room.png')},
]

export const postJobTypes = [
    {name:'FULL', value:'Full Time'},
    {name:'PART', value:'Part Time'},
]

export const postJobSalaryUnits = [
    {name:'KPM', value:'Thousand(s) per month'},
    {name:'LPA', value:'Lakh(s) per annum'},
]



/*
*
* NEXT
*
* 1. communities listing
* - my profile
* - other user's profile
* - home
* - category wise explore communities
*
*
* */