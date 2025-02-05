import mongoose,{model,models} from 'mongoose';


export const videoOption={
    width:1080,
    height:1920
} as const

export interface IVideo{
    title:string;
    videoUrl:string;
    thubmUrl?:string;
    control?:boolean;
    transformation?:{
        width:number;
        height:number;
        quality?:number
    };
    _id?:mongoose.Types.ObjectId;
    createAT?:Date;
    updateAt?:Date
}

const videoSchema=new mongoose.Schema<IVideo>({
    title:{type:String,required:true},
    videoUrl:{type:String,required:true},
    thubmUrl:{type:String,required:true},
    control:{type:String,default:true},
    transformation:{
        height:{type:Number,default:videoOption.height},
        width:{type:Number,default:videoOption.width},
        quality:{type:Number,min:1,maz:100}
    }
},{timestamps:true})


const Video=models?.Video || model<IVideo>('Video',videoSchema)

export default Video