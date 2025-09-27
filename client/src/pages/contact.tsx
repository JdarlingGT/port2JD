import { useState } from "react";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSEO, createBreadcrumbSchema } from "@/hooks/use-seo";

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export default function Contact() {
  useSEO({
    title: "Contact - Jacob Darling | Get In Touch",
    description: "Ready to discuss your marketing automation and systems architecture needs? Get in touch with Jacob Darling to explore how strategic marketing combined with technical expertise can transform your business.",
    keywords: "contact jacob darling, marketing strategist contact, systems architect, marketing automation consultation",
    canonical: "https://jacobdarling.com/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Jacob Darling",
      "description": "Get in touch for marketing automation and systems architecture services",
      "breadcrumb": createBreadcrumbSchema([
        { name: "Home", url: "https://jacobdarling.com" },
        { name: "Contact", url: "https://jacobdarling.com/contact" }
      ])
    }
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.inquiryType) newErrors.inquiryType = "Inquiry type is required.";
    if (!formData.message) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", inquiryType: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-card pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Build Something Remarkable
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new challenges and opportunities. Whether you have a project in mind or just want to connect, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  data-testid="input-name"
                  aria-describedby="name-error"
                />
                {errors.name && <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  data-testid="input-email"
                  aria-describedby="email-error"
                />
                {errors.email && <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                  Inquiry Type
                </Label>
                <Select onValueChange={handleInquiryChange} value={formData.inquiryType} required>
                  <SelectTrigger data-testid="select-inquiry-type" aria-describedby="inquiry-type-error">
                    <SelectValue placeholder="Select an inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time Opportunity</SelectItem>
                    <SelectItem value="Freelance">Freelance Project</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
                {errors.inquiryType && <p id="inquiry-type-error" className="text-sm text-destructive mt-1">{errors.inquiryType}</p>}
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or how I can help..."
                  required
                  data-testid="textarea-message"
                  aria-describedby="message-error"
                />
                {errors.message && <p id="message-error" className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-background border border-border rounded-lg p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:jacob@bearcavemarketing.com"
                      className="text-foreground hover:text-primary transition-colors"
                      data-testid="contact-email"
                    >
                      jacob@bearcavemarketing.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/jacob-darling"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      data-testid="contact-linkedin"
                    >
                      /in/jacob-darling
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <a
                      href="https://github.com/yesmannow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      data-testid="contact-github"
                    >
                      /yesmannow
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-3">Ready to Get Started?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                I'm always interested in discussing new opportunities and innovative projects. 
                Let's explore how we can work together to create something exceptional.
              </p>
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-schedule-call"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
