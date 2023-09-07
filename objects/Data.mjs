export class Data {
    #db
    constructor(db) {
        this.#db = db
    }
    async init() {
        this.submissions = await this.getSubmissions()
        this.stories = await this.getStories()
        this.stories.map(row=>{
            row.submissions=this.getSubmissionsByStoryId(row.id)
        })
        this.publications = await this.getPublications()
        this.publications.map(row=>{
            row.submissions=this.getSubmissionsByPublicationId(row.id)
        })
        return this
    }
    async getStories() {
        return this.#db('stories')
            .select('id','title','word_count')
    }
    async getPublications() {
        return this.#db('pubs')
            .select('*')
    }
    async getSubmissions() {
        return this.#db('subs')
            .join('stories', 'subs.story_id', 'stories.id')
            .join('pubs', 'subs.pub_id', 'pubs.id')
            .join('responses', 'subs.response_id', 'responses.id')
            .select('subs.id',
                'subs.story_id',
                'stories.title as story',
                'subs.pub_id',
                'pubs.title as publication',
                'subs.date_submitted',
                'subs.date_responded',
                'subs.response_id',
                'responses.response'
            )
    }

    getSubmissionsByStoryId(id){
        return this.submissions.filter(row=>row.story_id==id)
    }

    getSubmissionsByPublicationId(id){
        return this.submissions.filter(row=>row.pub_id==id)
    }

}