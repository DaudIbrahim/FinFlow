import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransactionStore } from "@/store/useTransactionStore";
import { z } from "zod";
import { useEffect } from "react";

import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_STATUSES,
} from "@/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ITransaction } from "@/types";
import { formatDateForInput } from "@/utils";

const schema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters"),
  amount: z.number().positive("Amount must be greater than 0"),
  type: z.enum(TRANSACTION_TYPES),
  category: z.enum(TRANSACTION_CATEGORIES),
  date: z.date(),
  status: z.enum(TRANSACTION_STATUSES),
});

type FormValues = z.infer<typeof schema>;

interface AddTransactionFormProps {
  onSuccess: () => void;
}

export default function AddTransactionForm({
  onSuccess,
}: AddTransactionFormProps) {
  const transactions = useTransactionStore((s) => s.transactions);
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      amount: 10,
      type: "expense",
      category: "Food",
      date: new Date(),
      status: "completed",
    },
  });

  const selectedType = watch("type");
  const selectedCategory = watch("category");

  // Minimal change: adjust category automatically when type changes
  useEffect(() => {
    if (selectedType === "income") {
      setValue("category", "Income");
    } else if (selectedType === "expense" && selectedCategory === "Income") {
      setValue("category", "Food");
    }
  }, [selectedType, setValue, selectedCategory]);

  const onSubmit = (values: FormValues) => {
    const newTransaction: ITransaction = {
      ...values,
      id: `tx-` + `${transactions.length + 1}`.padStart(3, "0"),
      date: formatDateForInput(values.date),
    };

    addTransaction(newTransaction);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Add Transaction</FieldLegend>
        <FieldDescription>Track your income and expenses.</FieldDescription>

        <FieldGroup>
          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>

                <Input
                  id="description"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />

                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            )}
          />

          {/* Amount */}
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="amount">Amount (BDT)</FieldLabel>
                <Input
                  id="amount"
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
                {errors.amount && (
                  <FieldError>{errors.amount.message}</FieldError>
                )}
              </Field>
            )}
          />

          {/* Type */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <FieldError>{errors.type.message}</FieldError>}
              </Field>
            )}
          />

          {/* Category */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_CATEGORIES.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        disabled={
                          selectedType === "income"
                            ? c !== "Income"
                            : c === "Income"
                        }
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <FieldError>{errors.category.message}</FieldError>
                )}
              </Field>
            )}
          />

          {/* Date */}
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="date">Date</FieldLabel>
                <Input
                  id="date"
                  type="date"
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
                {errors.date && <FieldError>{errors.date.message}</FieldError>}
              </Field>
            )}
          />

          {/* Status */}
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <FieldError>{errors.status.message}</FieldError>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full mt-4">
          Add Transaction
        </Button>
      </FieldSet>
    </form>
  );
}
