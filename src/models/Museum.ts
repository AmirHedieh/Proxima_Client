export interface IRawMuseum {
    id: number
    phone_number: string
    name: string
    image_url: string
    information: string
    website: string
    instagram: string
    twitter: string
    user_id: number
}

export interface IMuseum {
    id: number
    phoneNumber: string
    name: string
    picture: string
    information: string
    website: string
    instagram: string
    twitter: string
    user_id: number
}
export class Museum implements IMuseum {
    public static keyExtractor(Museum: Museum): string {
        return String(Museum.id)
    }

    public id: number
    public phoneNumber: string
    public name: string
    public picture: string
    public information: string
    public website: string
    public instagram: string
    public twitter: string
    public user_id: number
    public constructor(rawMuseum: IRawMuseum) {
        this.id = rawMuseum.id
        this.picture = rawMuseum.image_url
        this.name = rawMuseum.name
        this.phoneNumber = rawMuseum.phone_number
        this.website = rawMuseum.website
        this.instagram = rawMuseum.instagram
        this.twitter = rawMuseum.twitter
        this.information = rawMuseum.information
        this.user_id = rawMuseum.user_id
    }
}
