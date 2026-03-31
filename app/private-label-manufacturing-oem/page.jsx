import Image from "next/image";
import Link from "next/link";
import {
  FaBoxes,
  FaCheckCircle,
  FaClipboardCheck,
  FaFlask,
  FaLayerGroup,
} from "react-icons/fa";

export const metadata = {
  title: "Private Label Manufacturing / OEM",
  description:
    "Partner with Ivexia Pharma for private label and OEM pharmaceutical manufacturing with GMP quality, flexible batch sizes, and end-to-end support.",
  alternates: {
    canonical: "/private-label-manufacturing-oem",
  },
};

const capabilities = [
  {
    title: "Formulation Development",
    description:
      "Support from concept selection to market-ready formula across defined dosage platforms.",
    icon: FaFlask,
  },
  {
    title: "Custom Branding",
    description:
      "Private-label pack setup, artwork coordination, and format alignment for your target market.",
    icon: FaLayerGroup,
  },
  {
    title: "Regulatory Documentation",
    description:
      "Technical dossiers, CoAs, and quality file support aligned with buyer requirements.",
    icon: FaClipboardCheck,
  },
  {
    title: "Scalable Manufacturing",
    description:
      "Pilot, launch, and scale-up support with controlled manufacturing and traceability.",
    icon: FaBoxes,
  },
];

const engagementModels = [
  {
    title: "Market Entry Model",
    description:
      "For partners entering a new territory who need focused SKU selection and launch-ready support.",
    fit: "Best for first-market launches and category pilots.",
  },
  {
    title: "Portfolio Expansion Model",
    description:
      "For established brands adding new product lines under existing distribution networks.",
    fit: "Best for expanding category depth and shelf coverage.",
  },
  {
    title: "Continuity Supply Model",
    description:
      "For long-term buyers prioritizing stable planning, repeat scheduling, and quality consistency.",
    fit: "Best for high-repeat procurement and scale programs.",
  },
];

const dosageForms = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Suspensions",
  "Topicals",
  "Sachets",
];

const processSteps = [
  "Requirement discovery and product-market alignment",
  "Formula/pack finalization and documentation planning",
  "Commercial manufacturing with in-process quality controls",
  "Final release, dispatch coordination, and continuity planning",
];

const therapeuticAreas = [
  "General Medicine",
  "Pain Management",
  "Nutraceuticals",
  "Gastro Care",
  "Respiratory Care",
  "Dermatology",
  "Women's Health",
  "Pediatric Support",
];

const documentationPack = [
  "Product specification sheets",
  "Certificate of Analysis format",
  "Stability and storage guidance",
  "Batch and release documentation",
  "Pack and label compliance checklist",
  "Shipping and handling documentation",
];

const qualityFramework = [
  {
    stage: "Raw Material Qualification",
    control:
      "Supplier verification, identity checks, and incoming material acceptance criteria.",
    output: "Approved material status before production start.",
  },
  {
    stage: "In-Process Quality Monitoring",
    control:
      "Critical process checkpoints at blending, compression/filling, and packing stages.",
    output: "Controlled process consistency across the batch lifecycle.",
  },
  {
    stage: "Finished Product Testing",
    control:
      "Defined release testing based on product profile and applicable quality requirements.",
    output: "Batch disposition report and quality release readiness.",
  },
  {
    stage: "Release and Dispatch Control",
    control:
      "Final documentation verification and dispatch condition checks before shipment.",
    output: "Market-ready release package with traceable records.",
  },
];

const supportScope = [
  {
    title: "Brand and Pack Development",
    details:
      "Carton, label, insert, and shipper alignment based on brand requirements and country norms.",
  },
  {
    title: "Regulatory and Quality File Support",
    details:
      "CoA, specifications, and supporting quality documents for registration workflows.",
  },
  {
    title: "Supply and Delivery Planning",
    details:
      "Forecast-aware batch scheduling and shipment planning for repeat business cycles.",
  },
];

const onboardingChecklist = [
  "Target market and product category",
  "Preferred dosage form and strength",
  "Packaging format and branding direction",
  "Projected demand and launch window",
  "Compliance expectations and documentation scope",
];

const faqs = [
  {
    question: "Can you support low-volume market entry batches?",
    answer:
      "Yes. We can begin with pilot/launch volumes and then scale after demand validation.",
  },
  {
    question: "Do you provide private label packaging options?",
    answer:
      "Yes. We support branded packaging formats with artwork coordination and compliance checks.",
  },
  {
    question: "Can documentation be aligned for different country requirements?",
    answer:
      "Yes, documentation support can be structured based on market-specific submission expectations.",
  },
  {
    question: "What information is needed to start an OEM discussion?",
    answer:
      "At minimum: category, dosage form, target country, expected volume, and preferred launch timeline.",
  },
  {
    question: "Do you support repeat supply planning after launch?",
    answer:
      "Yes. We can set continuity planning based on forecast cycles and replenishment requirements.",
  },
  {
    question: "Can Ivexia support both single-SKU and multi-SKU programs?",
    answer:
      "Yes. Engagement can start from a focused SKU and expand to a broader portfolio as needed.",
  },
];

export default function PrivateLabelManufacturingPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF7A00] to-[#E2004F]";
  const brandTextGradient =
    "bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent";

  return (
    <div className="bg-[#f6f8fb] min-h-screen">
      <section className="relative h-[42vh] md:h-[66vh] overflow-hidden">
        <Image
          src="/images/Manufacturing.jpg"
          alt="Private Label Manufacturing"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0d2d47]/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-white">
            <p className="text-sm md:text-base tracking-[0.2em] uppercase text-[#ffd4bf] font-semibold">
              Ivexia Offerings
            </p>
            <h1 className="text-3xl text-[#FF7A00] md:text-5xl font-bold mt-3 max-w-3xl leading-tight">
              Private Label Manufacturing / OEM
            </h1>
            <p className="mt-4 text-sm md:text-lg text-white max-w-2xl">
              Build and scale your pharmaceutical brand with structured OEM
              execution, quality governance, and dependable supply continuity.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white text-[#E2004F] font-semibold hover:bg-[#fff3ef] transition-colors"
              >
                Start OEM Discussion
              </Link>
              <Link
                href="/offerings-overview"
                className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Explore All Offerings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            "WHO-GMP aligned production standards",
            "Flexible batch planning for market launches",
            "End-to-end OEM support from concept to delivery",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#E2004F]/15 bg-[#fff8f4] p-5 text-[#0d2d47] font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-8 md:pb-14">
        <div className="grid md:grid-cols-3 gap-5">
          {engagementModels.map((model) => (
            <article
              key={model.title}
              className="rounded-2xl border border-[#E2004F]/15 bg-white p-6 shadow-sm"
            >
              <h2 className={`text-xl font-semibold ${brandTextGradient}`}>
                {model.title}
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {model.description}
              </p>
              <p className="mt-4 text-sm font-medium text-[#0d2d47]">{model.fit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff7f2] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47] text-center">
            OEM Capability Stack
          </h2>
          <p className="text-gray-600 text-center mt-3 max-w-3xl mx-auto">
            A full private-label workflow designed for distributors, importers,
            and healthcare brands operating in varied market conditions.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-white rounded-2xl border border-[#E2004F]/15 shadow-sm p-6"
                >
                  <div
                    className={`w-11 h-11 rounded-lg text-white flex items-center justify-center ${brandGradient}`}
                  >
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0d2d47]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47]">
            Dosage Forms We Manufacture
          </h2>
          <p className="text-gray-600 mt-3">
            Our setup supports multiple dosage platforms with consistency in
            process control and batch documentation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-7">
            {dosageForms.map((form) => (
              <div
                key={form}
                className="rounded-lg border border-[#E2004F]/15 px-4 py-3 text-sm font-medium text-[#0d2d47] bg-white"
              >
                {form}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2004F]/15 p-7 shadow-sm">
          <h3 className={`text-xl font-semibold ${brandTextGradient}`}>
            Documentation and Technical Deliverables
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            As required by product and market scope, projects can include the
            following documentation package elements.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {documentationPack.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#E2004F]/15 bg-[#fff8f4] px-4 py-3 text-sm text-[#0d2d47]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-14 md:py-20 text-white ${brandGradient}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Project Execution Flow
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/15 p-6 backdrop-blur-sm">
                <p className="text-white text-sm font-semibold">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47] text-center">
          Quality Governance Framework
        </h2>
        <p className="text-gray-600 text-center mt-3 max-w-3xl mx-auto">
          Quality is embedded at each stage from raw material qualification to
          release and dispatch control.
        </p>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {qualityFramework.map((item) => (
            <article
              key={item.stage}
              className="rounded-2xl border border-[#E2004F]/15 bg-white p-6 shadow-sm"
            >
              <h3 className={`text-lg font-semibold ${brandTextGradient}`}>
                {item.stage}
              </h3>
              <p className="text-sm text-gray-600 mt-3">{item.control}</p>
              <p className="text-sm text-[#0d2d47] mt-3 font-medium">
                Output: {item.output}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8f4] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47]">
              Therapeutic and Market Coverage
            </h2>
            <p className="text-gray-600 mt-3">
              We support private-label programs across essential therapeutic
              categories for regulated and semi-regulated markets.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-7">
              {therapeuticAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-lg border border-[#E2004F]/15 bg-white px-4 py-3 text-sm text-[#0d2d47] font-medium"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2004F]/15 shadow-sm p-7">
            <h3 className={`text-xl font-semibold ${brandTextGradient}`}>
              What We Support End-to-End
            </h3>
            <div className="space-y-5 mt-5">
              {supportScope.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-[#0d2d47]">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47]">
            Built on Quality and Compliance
          </h2>
          <p className="text-gray-600">
            Every batch follows validated processes, quality checkpoints, and
            release controls to protect your brand integrity.
          </p>
          <ul className="space-y-3">
            {[
              "Raw material qualification and vendor control",
              "In-process and finished-goods quality testing",
              "Batch records, traceability, and release documentation",
              "Export-ready logistics and documentation support",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-[#E2004F] mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/ivexia-factory1.jpg"
            alt="Ivexia facility"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-4 md:py-10">
        <div className="rounded-2xl border border-[#E2004F]/15 bg-white p-7 md:p-8">
          <h2 className={`text-2xl md:text-3xl font-bold ${brandTextGradient}`}>
            Information Needed to Start Scoping
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Sharing the below inputs helps us propose a practical and faster OEM
            project pathway.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {onboardingChecklist.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#E2004F]/15 bg-[#fff8f4] px-4 py-3 text-sm text-[#0d2d47]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-16 py-6 md:py-10">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0d2d47] text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-[#E2004F]/15 bg-white px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-[#0d2d47] flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="text-[#E2004F] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className={`py-14 md:py-20 text-white ${brandGradient}`}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Launch Your Private Label Portfolio With Ivexia
          </h2>
          <p className="mt-3 text-gray-100">
            Share your market plan and product requirement set. Our team can
            structure a practical OEM roadmap with defined execution stages.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white text-[#E2004F] font-semibold hover:bg-[#fff3ef] transition-colors"
            >
              Start OEM Discussion
            </Link>
            <Link
              href="/offerings-overview"
              className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Explore All Offerings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
