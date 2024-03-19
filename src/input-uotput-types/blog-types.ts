export type OutputBlogType = {
    
        id: string,
        name: string,
        description: string,
        websiteUrl: string,
            
          
    
}

export type InputBlogType = {
        name: string,
        description: string,
        websiteUrl: string,
}


export type UpdateBlogType = {
    name: string,
    description: string,
    websiteUrl: string,
}

export const BlogValidatorRules = {
        nameMaxLength: 15,
        descriptionMaxLength:500,
        websiteUrlMaxLength: 100,
        websiteUrlPattern: '/^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/'
}