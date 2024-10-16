import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import Divider from "@/components/ui/divider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const initCount: { [key: string]: number } = { adult: 1, child: 0, baby: 0 };

const TravellersCountInput = ({ id, register, setValue }: any) => {
  const [count, setCount] = useState(initCount);
  const [placeholder, setPlaceholder] = useState<string>(
    "أختر عدد المسافرين..."
  );

  const handleChange = (id: string, isAdd?: boolean) => {
    setCount((prev: any) => {
      if (isAdd) {
        const newCount = prev[id] < 10 && count[id] + 1;
        setValue(id, newCount);
        return {
          ...prev,
          [id]: newCount,
        };
      }

      const newCount = prev[id] > 0 && count[id] - 1;
      setValue(id, newCount);
      return {
        ...prev,
        [id]: newCount,
      };
    });
  };

  useEffect(() => {
    // if (isDirty)
    setPlaceholder(
      `${count.adult ? `عدد ${count.adult} بالغ.` : ""} ${
        count.child ? `عدد ${count.child} طفل.` : ""
      } ${count.baby ? `عدد ${count.baby} رضيع.` : ""}`
    );
  }, [count]);

  return (
    <>
      <Label label="المسافرين" id={id} className="text-main" />

      <Select dir="rtl">
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>المسافرين</SelectLabel>
            {["adult", "child", "baby"].map((id: any) => (
              <span key={id}>
                <div className="p-2 flex justify-between items-center">
                  <div>
                    <Label
                      label={
                        id === "adult"
                          ? "بالغ"
                          : id === "child"
                          ? "طفل"
                          : "رضيع"
                      }
                      id={id}
                      className="text-main md:text-lg"
                    />
                    <p className="text-sm md:text-base">
                      {id === "adult"
                        ? "12 سنة وما فوق"
                        : id === "child"
                        ? "2-11 سنة"
                        : "أقل من سنتين"}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      className="p-1 disabled:text-gray-400 disabled:bg-gray-200 transition-colors duration-300 rounded-sm"
                      disabled={count?.[id] >= 10}
                      onClick={() => handleChange(id, true)}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                    {count?.[id]}
                    <button
                      className="p-1 disabled:text-gray-400 disabled:bg-gray-200 transition-colors duration-300 rounded-sm"
                      disabled={
                        id === "adult" && count?.[id] === 1
                          ? true
                          : count?.[id] <= 0
                      }
                      onClick={() => handleChange(id)}
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <Divider
                  className={cn("my-4", id === "baby" ? "via-transparent" : "")}
                />
              </span>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <input
        type="hidden"
        name="adult"
        value={count.adult}
        {...register("adult")}
      />
      <input
        type="hidden"
        name="child"
        value={count.child}
        {...register("child")}
      />
      <input
        type="hidden"
        name="baby"
        value={count.baby}
        {...register("baby")}
      />
    </>
  );
};
export default TravellersCountInput;
