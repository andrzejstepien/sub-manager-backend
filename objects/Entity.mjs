export default class Entity{
    set _id(prop){
        if(prop){
            const propNumber = Number.parseInt(prop)
            console.log("PropNumber: "+propNumber)

            if(Number.isNaN(propNumber)){throw new TypeError("id must be an integer!")}
            this.id = propNumber
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
        .del()
    }
}


