export class Data {
    #db
    constructor(db) {
        this.#db = db
    }
    async init() {
        this.stories = await this.getStories()
        this.publications = await this.getPublications()
        this.submissions = await this.getSubmissions()
    }
    async getStories() {
        return this.#db('stories')
            .select('*')
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

}