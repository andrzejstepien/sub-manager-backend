import dv from "./dv.mjs"
export default class Entity{
    constructor(data){
        if(data?.id){
            if(!Number.isInteger(data.id)){throw new TypeError("id must be an integer!")}
            this.id = data.id
        }
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


