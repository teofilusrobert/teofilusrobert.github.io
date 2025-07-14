import React from 'react';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-10">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <p className="mb-4">Showcase your work here.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example project card */}
                <div className="border rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold">Project Title</h3>
                    <p>Description of the project goes here.</p>
                    <a href="#" className="text-blue-500 hover:underline">View Project</a>
                </div>
                {/* Add more project cards as needed */}
            </div>
        </section>
    );
};

export default Projects;