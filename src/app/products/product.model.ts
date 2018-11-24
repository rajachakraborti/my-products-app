// will change to fluent builder pattern
export class Product {
    private name: string;
    private id: number;
    private description: string;
    private url: string;
    private categories: number[];


	constructor(id) {
        this.id = id;
	}
    

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public addName(value: string) {
        this.name = value;
        return this;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public addDescription(value: string) {
        this.description = value;
        return this;
    }
    /**
     * Setter $url
     * @param {string} value
     */
	public addUrl(value: string) {
        this.url = value;        
        return this;
	}
    

    /**
     * Setter $categories
     * @param {[]} value
     */
	public addCategories(value: number) {
        this.categories.push(value);
        return this;
	}


    /**
     * Getter $url
     * @return {string}
     */
	public get $url(): string {
		return this.url;
	}
    

    /**
     * Getter $categories
     * @return {number[]}
     */
	public get $categories(): number[] {
		return this.categories;
	}

}