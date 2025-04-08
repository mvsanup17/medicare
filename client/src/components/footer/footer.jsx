import React from "react";
import "./footer.css";

function Footer() {
    return (
        <footer className="py-4 footer-bg">
            <div className="text-center py-3">
                <p>
                    <b>Disclaimer : “Medicare - Treat Yourself” </b> is intended for minor health issues and provides general advice.
                </p>
                <p>
                    It is not a substitute for professional medical care. For persistent or serious conditions, please consult a doctor. 
                </p>
                <p className="mb-0">&copy; Medicare - Treat Yourself . All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;