export class Resource {
    key: string;
    data: any;

    constructor({key, data} : { key: string, data: any}) {
        this.key = key;
        this.data = data;
    }

    public getData(): any {
        return this.data;
    }
}