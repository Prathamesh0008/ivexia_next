'use client'

import { useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaTelegramPlane, 
  FaLinkedinIn, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Phone validation: exactly 10 digits (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = 'Phone number must be exactly 10 digits'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters'
    }
    
    return errors
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  const errors = validateForm()
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors)
    return
  }

  setLoading(true)
  setSuccess(false)
  setError("")

  try {
    // Send to Admin
    await emailjs.send(
      "service_gss4j1p",
      "template_nh2iyu5",
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      "QGGp40v8O40-464My"
    )

    // Send to User
    await emailjs.send(
      "service_gss4j1p",
      "template_8e1weya",
      {
        to_email: formData.email,
        from_name: formData.name,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      "QGGp40v8O40-464My"
    )

    setSuccess(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })

  } catch (err) {
    console.error(err)
    setError("Failed to send message. Please try again.")
  }

  setLoading(false)
}


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }

  return (
    <div className="bg-[#FFF8F5] min-h-screen pt-20">
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
            Contact Ivexia Pharmaceuticals
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            Reach out to us for pharmaceutical inquiries, partnerships, and support. 
            Our team is here to assist you with your healthcare needs.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-stretch">

          {/* FORM */}
          <div className="bg-white shadow-sm border border-gray-100 p-8 flex flex-col">
            <h2 className="text-xl font-semibold text-[#0d2d47] mb-1">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              We'll get back to you within 24 hours
            </p>

            {/* Status Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800">Message sent successfully! We'll contact you soon.</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                  {formErrors.email && <span className="text-red-500 text-xs ml-2">({formErrors.email})</span>}
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19a6b5] focus:border-transparent transition-all disabled:opacity-50 ${
                    formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                    {formErrors.name && <span className="text-red-500 text-xs ml-2">({formErrors.name})</span>}
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19a6b5] focus:border-transparent transition-all disabled:opacity-50 ${
                      formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Phone Number
                    {formErrors.phone && <span className="text-red-500 text-xs ml-2">({formErrors.phone})</span>}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19a6b5] focus:border-transparent transition-all disabled:opacity-50 ${
                      formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="10 digit number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Subject <span className="text-red-500">*</span>
                  {formErrors.subject && <span className="text-red-500 text-xs ml-2">({formErrors.subject})</span>}
                </label>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19a6b5] focus:border-transparent transition-all disabled:opacity-50 ${
                    formErrors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Message <span className="text-red-500">*</span>
                  {formErrors.message && <span className="text-red-500 text-xs ml-2">({formErrors.message})</span>}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19a6b5] focus:border-transparent transition-all disabled:opacity-50 resize-none ${
                    formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>

            {/* Contact Info - Moved inside form div for better layout */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2 text-[#19a6b5]" />
                  <span className="text-sm">info@ivexiapharma.com</span>
                </div>
                {/* <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-[#19a6b5]" />
                  <span className="text-sm">+1 234 567 890</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="relative overflow-hidden shadow-sm border border-gray-100 rounded-xl h-[500px] lg:h-auto">
            <Image
              src="/images/ivexia-factory1.jpg"
              alt="Ivexia Pharmaceuticals Facility"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay with contact details */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d47]/90 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Visit Us</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0" />
                    <span>123 Pharma Street, Healthcare City<br />New York, NY 10001</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-3" />
                    <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 flex justify-center space-x-6">
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-[#0d2d47] text-white flex items-center justify-center hover:bg-[#19a6b5] transition-colors duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-[#0d2d47] text-white flex items-center justify-center hover:bg-[#19a6b5] transition-colors duration-300 transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-[#0d2d47] text-white flex items-center justify-center hover:bg-[#19a6b5] transition-colors duration-300 transform hover:scale-110"
            aria-label="Telegram"
          >
            <FaTelegramPlane size={20} />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-[#0d2d47] text-white flex items-center justify-center hover:bg-[#19a6b5] transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>For urgent pharmaceutical inquiries, please call our emergency support line.</p>
          <p className="mt-1">We're committed to responding within 24 hours on business days.</p>
        </div>
      </section>
    </div>
  )
}