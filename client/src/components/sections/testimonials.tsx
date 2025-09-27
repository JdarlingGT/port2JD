import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  clientName: string;
  clientTitle: string;
  logoUrl: string;
  logoAlt: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The custom dashboard they built for us revolutionized our workflow and gave us the insights we needed to grow.",
    clientName: "Dr. Jane Smith",
    clientTitle: "CEO, PrimaryCare Indy",
    logoUrl: "@assets/case-studies/primarycare-indy-logo.png",
    logoAlt: "PrimaryCare Indy Logo"
  },
  {
    quote: "From a complete rebrand to a lead-generating website, the results were outstanding. Our online presence has never been stronger.",
    clientName: "John Ayres",
    clientTitle: "Owner, Ayres Mechanical",
    logoUrl: "@assets/case-studies/ayres-mechanical-logo.png",
    logoAlt: "Ayres Mechanical Logo"
  },
  {
    quote: "The new e-commerce platform is not only beautiful but also incredibly functional. We've seen a significant increase in online sales.",
    clientName: "Sarah Behr",
    clientTitle: "Founder, Behr Pet Essentials",
    logoUrl: "@assets/case-studies/behr-pet-essentials-logo.png",
    logoAlt: "Behr Pet Essentials Logo"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-heading">
            What My Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from businesses I've helped transform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 flex flex-col"
              data-testid={`testimonial-card-${index}`}
            >
              <Quote className="w-8 h-8 text-primary/50 mb-4" />
              <p className="text-foreground leading-relaxed flex-grow">{testimonial.quote}</p>
              <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
                <img 
                  src={testimonial.logoUrl} 
                  alt={testimonial.logoAlt} 
                  className="h-12 w-12 object-contain rounded-md bg-white p-1 border"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.clientTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}