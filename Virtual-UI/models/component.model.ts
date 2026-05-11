import mongoose from "mongoose";

export interface Icomponent  {
    _id?: string | mongoose.Schema.Types.ObjectId;
    npmPackage : string;
    name : string;
    code_jsx : string;
    code_tsx : string;
    props : [string];
    owner : mongoose.Schema.Types.ObjectId;
    visibility : string;
    createdAt?: string | Date;
}

const componentSchema = new mongoose.Schema<Icomponent>({
    name : {
        type : String
    },

    code_jsx : {
        type : String
    },

    code_tsx : {
        type : String
    },

    props : {
        type : [String]
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    visibility : {
        type : String,
        enum :["private", "public"],
        default : "private"
    },

    npmPackage : {
        type : String
    }
}, {timestamps : true});

const Components = mongoose.models.Components || mongoose.model("Components", componentSchema);

export default Components;