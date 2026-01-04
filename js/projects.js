// Projects

const projects = [
    {
        name: 'PROJECT ONE',
        type: 'WEB DESIGN',
        pos: 'start',
        image: 'https://i.pinimg.com/736x/37/32/1b/37321bc23140c7d882e0b6b0854fa255.jpg' 
    },
    {
        name: 'PROJECT 2',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        image: 'https://i.pinimg.com/736x/f7/fe/5f/f7fe5fc4f88fece1853a4bf2126ecf3f.jpg' 
    },
    {
        name: 'PROJECT 3',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: 'https://cdn.cosmos.so/0084a2c2-94b3-4a75-8ad5-61bcece6b47d?format=jpeg', },
    {
        name: 'PROJECT 4',
        type: 'WEB DESIGN',
        pos: 'mid',
        image: 'https://i.pinimg.com/1200x/05/58/46/055846dc20e3de7bcbf228a981e90737.jpg' 
    },
    {
        name: 'PROJECT 5',
        type: 'WEB DESIGN',
        pos: 'end',
        image: 'https://i.pinimg.com/1200x/3a/19/92/3a1992c21b80e77b278524e6c565ba40.jpg' 
    },
    {
        name: 'PROJECT 6',
        type: 'GRAPHIC DESIGN',
        pos: 'mid',
        image: 'https://i.pinimg.com/1200x/d8/ca/ac/d8caac7665a292500af004e8d20d5888.jpg' 
    },
    {
        name: 'PROJECT 7',
        type: 'WEB DESIGN',
        pos: 'start',
        image: 'https://i.pinimg.com/1200x/73/2d/26/732d26ee90b87df1efbd0359fe00e163.jpg' 
    },
    {
        name: 'PROJECT 8',
        type: 'TYPE DESIGN',
        pos: 'end',
        image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },

]

const createProjects = () =>{
    projects.forEach( project =>{
        let panel = document.createElement('div');
        panel.classList.add('project', `${project.pos}`)

        let imageContainer = document.createElement('div')
        imageContainer.className = 'image__container'

        let image = document.createElement('img');
        image.classList.add('project__image');
        image.src = project.image;

        let projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        let projectTitle = document.createElement('p');
        projectTitle.innerText = project.name

        let projectType = document.createElement('p')
        projectType.innerText = project.type;

        projectDetails.append(projectTitle, projectType)

        imageContainer.appendChild(image);
        panel.append(imageContainer, projectDetails)

        document.querySelector('.projects__slider').appendChild(panel)
    })
}


// Blog posts

const blogPosts = [
    {
        title: 'BLOG POST ONE',
        time: '3 MIN',
        image: 'https://i.pinimg.com/1200x/3a/19/92/3a1992c21b80e77b278524e6c565ba40.jpg' 
    },
    {
        title: 'BLOG POST TWO',
        time: '4 MIN',
        image: 'https://i.pinimg.com/1200x/05/58/46/055846dc20e3de7bcbf228a981e90737.jpg' 
    },
    {
        title: 'BLOG POST THREE',
        time: '5 MIN',
        image: 'https://cdn.cosmos.so/0084a2c2-94b3-4a75-8ad5-61bcece6b47d?format=jpeg' 
    }
]

const createBlogposts = () => {
    blogPosts.forEach(post =>{
        let blogPostSection = document.createElement('div')
        blogPostSection.classList.add('blog__post')

        let postDiv = document.createElement('div');
        postDiv.classList.add('post')

        let imageContainer = document.createElement('div')
        imageContainer.classList.add('post__image__container')

        let image = document.createElement('img')
        image.classList.add('blog__post__image');
        image.src = post.image

        let postDetails = document.createElement('div')
        postDetails.classList.add('post__details')

        let postTitle = document.createElement('p')
        postTitle.innerText = post.title

        let postTime = document.createElement('p')
        postTime.innerText = post.time

        imageContainer.appendChild(image)
        postDetails.append(postTitle, postTime)

        postDiv.append(imageContainer, postDetails)

        blogPostSection.appendChild(postDiv)

        document.getElementById('blog').appendChild(blogPostSection);
    })
}

export {
    createProjects,
    createBlogposts
}