
import Navbar from "../../components/navbar";

export default function TermsAndConditions() {
    const data = [
        {
          title: "1. Booking and Payment:",
          description:
            "To reserve a spot on our retreats, a non-refundable deposit is required at the time of booking. The remaining balance is due according to the specified schedule. We accept various forms of payment, including credit cards, bank transfers, and other approved methods."
        },
        {
          title: "2. Cancellation and Refund Policy:",
          description:
            "Cancellations made [X] days prior to the retreat start date are eligible for a full refund of the total retreat cost, excluding the non-refundable deposit. Cancellations made after [X] days before the retreat start date are non-refundable. In case of cancellation by [Your Company], a full refund will be issued to the participant."
        },
        {
          title: "3. Health and Fitness:",
          description:
            "  Participants must be in good physical and mental health to attend our retreats. It is the participant's responsibility to inform us of any health conditions or dietary restrictions at the time of booking."
        },
        {
          title: "4. Travel Documentation:",
          description:
            "Participants are responsible for ensuring they have the necessary travel documentation, including passports and visas, if required, for international retreats."
        },
        {
          title: "5. Liability Waiver:",
          description:
            " All participants must sign a liability waiver before joining the retreat, acknowledging that they are aware of the inherent risks associated with physical activities during the retreat."
        },
        {
          title: "6. Code of Conduct:",
          description:
            "Respect for fellow participants, instructors, and local culture is expected at all times. Inappropriate behavior or violations of the code of conduct may result in dismissal from the retreat with no refund."
        },
        {
          title: "7. Accommodations:",
          description:
            "Accommodations are based on double occupancy unless otherwise specified. Single rooms may be available for an additional fee. Room assignments are made at the discretion of [Your Company] and are subject to change if necessary."
        },
        {
          title: "8. Itinerary Changes:",
          description:
            "[Your Company] reserves the right to make changes to the itinerary, including activities, schedules, and accommodations, in the event of unforeseen circumstances or safety concerns."
        },
        {
          title: "9. Force Majeure:",
          description:
            "[Your Company] is not liable for any changes, cancellations, or delays resulting from circumstances beyond our control, including but not limited to natural disasters, acts of terrorism, or government actions."
        },
        {
          title: "10. Insurance:",
          description:
            "Participants are strongly encouraged to have travel insurance that covers trip cancellations, medical emergencies, and personal belongings."
        },
        {
          title: "11. Customization:",
          description:
            "Customized retreat plans are subject to additional fees and must be requested within the specified time frame."
        },
        {
          title: "12. Complaints and Concerns:",
          description:
            "Any complaints or concerns should be addressed to our on-site coordinator or via the provided contact information during the retreat."
        },
        {
          title: "13. By booking a retreat with [Your Company]:",
          description:
            "Participants agree to abide by these terms and conditions. [Your Company] reserves the right to modify these terms and conditions at any time, and the most recent version will be provided to participants upon booking."
        }
      ];

  return (
    <section className="relative md:p-0 px-3 min-h-[97.7vh] md:min-h-[97vh]">
      <div className="md:w-[85%] mx-auto w-full">
        <Navbar />
        <main className="my-10">
        <div className="inset-0 flex items-center justify-center ">
            <h1 className="text-4xl font-bold text-center text-black">
              Terms and Conditions
            </h1>
          </div>
        <div className="md:w-[70%] w-full md:p-0 px-4 mt-16 mx-auto">
        {data.map((item, index) => {
          return (
            <div key={index} className="mt-4 ms-3">
              <h1 className="mb-2 text-base font-bold">{item["title"]}</h1>
              <p>{item["description"]}</p>
            </div>
          );
        })}
        <p className="mt-4">
          By booking a retreat with [Your Company], participants agree to abide
          by these terms and conditions. [Your Company] reserves the right to
          modify these terms and conditions at any time, and the most recent
          version will be provided to participants upon booking.
        </p>
      </div>
        </main>
      </div>
    </section>
  );
}
