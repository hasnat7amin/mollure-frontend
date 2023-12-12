export default function TitleBar({ title }) {
  return (
    <section >
      <div className="w-full py-2 ps-5 bg-customBlue rounded-md mt-5 ">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>
    </section>
  );
}
