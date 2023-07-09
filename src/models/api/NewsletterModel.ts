export interface INewsletterResponse {
    data: INewsletterData;
    error: string;
    message: string;
    status: number;
}

interface INewsletterData {
    new_newsletter_subscription: Newnewslettersubscription;
}

interface Newnewslettersubscription {
    email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
