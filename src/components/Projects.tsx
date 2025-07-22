import React from 'react';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-10 px-4">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <p className="mb-4">Check my contributions on my previous company
                <br/>
                <a href="https://www.softwareseni.co.id/our-works" className='flex items-center gap-2 text-blue-500 hover:underline'>
                    <img src="https://cdn.prod.website-files.com/5d8a2887296e9177accb65bc/5f7166e098d4c7feafd83965_logogram-light-new-32.png" alt="SS"/>
                    SoftwareSeni
                </a>
                or <a href="https://github.com/teofilusrobert/portfolio" className='text-blue-500 hover:underline'>My Git</a>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example project card */}
                {/* <div className="border rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold">Project Title</h3>
                    <p>Description of the project goes here.</p>
                    <a href="#" className="text-blue-500 hover:underline">View Project</a>
                </div> */}
                {/* Add more project cards as needed */}
            </div>
        </section>
    );
};

export default Projects;