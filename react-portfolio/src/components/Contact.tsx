import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-8">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-4">Provide your contact details here.</p>
            <ul className="mt-4">
                <li>Email: your.email@example.com</li>
                <li>Phone: (123) 456-7890</li>
            </ul>
        </section>
    );
};

export default Contact;