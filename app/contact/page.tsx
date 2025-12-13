'use client';

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Droplets } from "lucide-react";
import Particles from '../../components/Particles';
import { motion } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.subject ||
            !formData.message
        ) {
            alert("Please fill in all fields");
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;

        // Send to WhatsApp
        window.open(`https://wa.me/916239190187?text=${whatsappMessage}`, "_blank");

        // Show success message
        setIsSubmitted(true);

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    const handleWhatsAppClick = () => {
        window.open(
            "https://wa.me/916239190187?text=Hi, I would like to know more about Bluora water products",
            "_blank"
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white relative overflow-hidden">

            {/* Particles Background - COMMON FOR ENTIRE PAGE */}
            <div className="absolute inset-0 z-0 opacity-50">
                <Particles
                    particleColors={['#06b6d4', '#3b82f6', '#a855f7']}
                    particleCount={400}
                    particleSpread={5}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                />
            </div>

            {/* Radial Glow Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            {/* Radial Glow Bottom */}
            <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-gradient-radial from-purple-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>


            {/* Bluora Logo - Top Left */}
            <div className="relative z-10 pt-6 px-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                        <Droplets size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-bold text-white tracking-tight">
                            Bluora<span className="text-cyan-400">™</span>
                        </span>
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                            The Power of Pure
                        </span>
                    </div>
                </Link>
            </div>

            {/* Liquid Glass Header */}
            <div className="relative z-10 pt-6">
                <div className=" justify-items-center container mx-auto px-6">
                    {/* Liquid Glass Effect with Tailwind */}
                    <div className=" rounded-full border border-cyan-400/30 shadow-2xl/20 backdrop-blur-sm bg-white/10 w-2xl">
                        <motion.div
                            className="text-center py-8 px-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-3">
                                Get In Touch
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-semibold">
                                We&apos;d love to hear from you. Reach out to us anytime!
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content - Same Background, No Extra Glass */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information Section */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Contact Information
                            </h2>
                            <p className="text-cyan-100/70 mb-8">
                                Have questions about our products or services? Feel free to
                                contact us through any of the following channels.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {/* Address */}
                            <motion.div
                                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-cyan-400/20"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <MapPin className="text-cyan-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">
                                            Our Address
                                        </h3>
                                        <p className="text-cyan-100/70 text-sm">
                                            HD DRINKS & BEVERAGES
                                            <br />
                                            Arazi No. 453, Sachendi, Kanpur Nagar,
                                            <br />
                                            Uttar Pradesh - 209304
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-blue-400/20"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-500/20 p-3 rounded-lg">
                                        <Phone className="text-blue-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">
                                            Phone Number
                                        </h3>
                                        <a
                                            href="tel:+916239190187"
                                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                        >
                                            +91 6239 190187
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-cyan-400/20"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                                        <Mail className="text-cyan-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">
                                            Email Address
                                        </h3>
                                        <a
                                            href="mailto:Info@hddrinksbeverages.com"
                                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors break-all"
                                        >
                                            Info@hddrinksbeverages.com
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Business Hours */}
                            <motion.div
                                className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-purple-400/20"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-500/20 p-3 rounded-lg">
                                        <Clock className="text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-2">
                                            Business Hours
                                        </h3>
                                        <p className="text-purple-100/70 text-sm">
                                            Monday - Saturday: 9:00 AM - 6:00 PM
                                            <br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* License Info */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-xl p-6 border-2 border-cyan-400/30 shadow-xl">
                                <p className="text-sm text-cyan-100/80">
                                    <span className="font-semibold text-cyan-400">FSSAI License:</span>{" "}
                                    <span className="font-mono">12724999000167</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Section */}
                    <motion.div
                        className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-400/20"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Send Us A Message
                        </h2>

                        {isSubmitted && (
                            <motion.div
                                className="mb-6 bg-green-500/20 border-l-4 border-green-400 p-4 rounded backdrop-blur-sm"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-green-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-300">
                                            Thank you! We&apos;ll contact you soon.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-cyan-300 mb-2"
                                >
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-cyan-100/30 backdrop-blur-sm"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-cyan-300 mb-2"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-cyan-100/30 backdrop-blur-sm"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-cyan-300 mb-2"
                                >
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-cyan-100/30 backdrop-blur-sm"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-semibold text-cyan-300 mb-2"
                                >
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white placeholder-cyan-100/30 backdrop-blur-sm"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold text-cyan-300 mb-2"
                                >
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors resize-none text-white placeholder-cyan-100/30 backdrop-blur-sm"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <motion.button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r cursor-pointer from-cyan-600 via-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send size={20} />
                                <span>Send Message</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Fixed WhatsApp Button */}
            <motion.button
                onClick={handleWhatsAppClick}
                className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-green-600 cursor-pointer text-white p-4 rounded-full shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 z-50 group border-2 border-green-400/30"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <MessageCircle size={32} className="animate-pulse" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-ping"></span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    1
                </span>
            </motion.button>
        </div>
    );
};

export default ContactPage;
