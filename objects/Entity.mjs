import dv from "./dataValidation.mjs"
export default class Entity{
    set _id(prop){
        if(prop){
            if(!Number.isInteger(prop)){throw new TypeError("id must be an integer!")}
            this.id = prop
        }
    }
    
    constructor(data){
        this._id = data?.id
    }
    

    async insert(db){
        return db(this.table)
        .insert(this)
    }
    async update(db){
        return db(this.table)
        .where('id',this.id)
        .update(this)
    }
    async del(db){
        if(!this?.id){throw new Error("cannot delete without an id!")}
        return db(this.table)
        .where('id',this.id)
        this.del()
    }
}


