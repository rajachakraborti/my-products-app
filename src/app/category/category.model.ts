export class Category {

    private CategoryId: number;

    private Name: string;

    private checked: boolean;


    /**
     * Getter $CategoryId
     * @return {number}
     */
	public get $CategoryId(): number {
		return this.CategoryId;
	}

    /**
     * Getter $Name
     * @return {string}
     */
	public get $Name(): string {
		return this.Name;
	}
    

	constructor(CategoryId, Name) {
        this.CategoryId = CategoryId;
        this.Name = Name;
    }
    

    /**
     * Getter $checked
     * @return {boolean}
     */
	public get $checked(): boolean {
		return this.checked;
	}


    /**
     * Setter $checked
     * @param {boolean} value
     */
	public set $checked(value: boolean) {
		this.checked = value;
	}
    
}

