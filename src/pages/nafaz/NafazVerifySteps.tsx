const NafazVerifySteps = () => {
  return (
    <section className="text-[#129786]">
      <h3 className="font-bold text-center text-xl">متطلبات التحقق</h3>
      <h4 className="font-bold text-center mb-6">
        إصدار شريحة اعتماد من مشغل جوالك الأساسي
      </h4>

      <div className="grid grid-cols-3 text-sm text-center">
        <div>
          <p className="h-10">أولاّ يرجى التوجه إلى تطبيق نفاذ</p>
          <img
            className="h-32 mx-auto"
            src="/assets/images/client/nafaz-verify/01.png"
            alt="verify nafaz image"
          />
        </div>
        <div>
          <p className="h-10">ثانياّ أدخل على الطلبات ثم أضغط قبول الطلب</p>
          <img
            className="h-32 mx-auto"
            src="/assets/images/client/nafaz-verify/02.png"
            alt="verify nafaz image"
          />
        </div>
        <div>
          <p className="h-10">ثالثاّ أختر الرقم الذي سيظهر أمامك بعد ثوانِ</p>
          <img
            className="h-32 mx-auto"
            src="/assets/images/client/nafaz-verify/03.png"
            alt="verify nafaz image"
          />
        </div>
      </div>
    </section>
  );
};
export default NafazVerifySteps;
