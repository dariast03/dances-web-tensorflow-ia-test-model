/* eslint-disable max-lines */
"use client";

import React, { type FC, useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar, CalendarProps } from "./calendar";
import { DateInput } from "./date-input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Switch } from "./switch";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string;
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
  /** Option for showing compare feature */
  showCompare?: boolean;

  /** Option for showing date picker in a popover */
  popover?: boolean;

  labelButton?: string;

  calendarProps?: CalendarProps;

  blockStart?: boolean;
}

const formatDate = (date: Date, locale = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    // Split the date string to get year, month, and day parts
    const parts = dateInput.split("-").map((part) => Number.parseInt(part, 10));
    // Create a new Date object using the local timezone
    // Note: Month is 0-indexed, so subtract 1 from the month part
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date;
  }
  // If dateInput is already a Date object, return it directly
  return dateInput;
};

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  /*   { name: "today", label: "Hoy" },
  { name: "tomorrow", label: "Mañana" }, */
  { name: "next7", label: "Próximos 7 días" },
  { name: "next14", label: "Próximos 14 días" },
  { name: "next30", label: "Próximos 30 días" },
  { name: "next60", label: "Próximos 60 días" },
  { name: "next90", label: "Próximos 90 días" },
  { name: "next120", label: "Próximos 120 días" },
  /*  { name: "thisWeek", label: "Esta semana" },
  { name: "nextWeek", label: "Próxima semana" },
  { name: "thisMonth", label: "Este mes" },
  { name: "nextMonth", label: "Próximo mes" }, */
];

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker2: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
  showCompare = true,
  popover = true,
  labelButton = "Actualizar",
  calendarProps,
  blockStart
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const [range, setRange] = useState<DateRange>({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });
    const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
      initialCompareFrom
        ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
        : undefined,
    );

    // Refs to store the values of range and rangeCompare when the date picker is opened
    const openedRangeRef = useRef<DateRange | undefined>();
    const openedRangeCompareRef = useRef<DateRange | undefined>();

    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
      undefined,
    );

    const [isSmallScreen, setIsSmallScreen] = useState(
      typeof window !== "undefined" ? window.innerWidth < 960 : false,
    );

    useEffect(() => {
      const handleResize = (): void => {
        setIsSmallScreen(window.innerWidth < 960);
      };

      window.addEventListener("resize", handleResize);

      // Clean up event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const getPresetRange = (presetName: string): DateRange => {
      const preset = PRESETS.find(({ name }) => name === presetName);
      if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
      const from = new Date();
      const to = new Date();
      const first = from.getDate() - from.getDay();

      switch (preset.name) {
        case "today":
          blockStart && from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
        case "tomorrow":
          blockStart && from.setDate(from.getDate() + 1);
          blockStart && from.setHours(0, 0, 0, 0);
          to.setDate(to.getDate() + 1);
          to.setHours(23, 59, 59, 999);
          break;
        case "next7":
          to.setDate(to.getDate() + 7);
          to.setHours(23, 59, 59, 999);
          break;
        case "next14":
          to.setDate(to.getDate() + 14);
          to.setHours(23, 59, 59, 999);
          break;
        case "next30":
          to.setDate(to.getDate() + 30);
          to.setHours(23, 59, 59, 999);
          break;
        case "next60":
          to.setDate(to.getDate() + 60);
          to.setHours(23, 59, 59, 999);

          break;
        case 'next90':
          to.setDate(to.getDate() + 90);
          to.setHours(23, 59, 59, 999);
          break;
        case 'next120':
          to.setDate(to.getDate() + 120);
          to.setHours(23, 59, 59, 999);
          break;
      }

      if (calendarProps?.disabled) {
        if (
          typeof calendarProps.disabled === "object" &&
          "before" in calendarProps.disabled
        ) {
          if (from < calendarProps.disabled.before) {
            blockStart && from.setDate(calendarProps.disabled.before.getDate());
          }
        }

        if (
          typeof calendarProps.disabled === "object" &&
          "after" in calendarProps.disabled
        ) {
          if (to > calendarProps.disabled.after) {
            to.setDate(calendarProps.disabled.after.getDate());
          }
        }
      }
      return { from, to };
    };

    const setPreset = (preset: string): void => {
      const range = getPresetRange(preset);
      setRange(range);
      if (rangeCompare) {
        const rangeCompare = {
          from: new Date(
            range.from.getFullYear() - 1,
            range.from.getMonth(),
            range.from.getDate(),
          ),
          to: range.to
            ? new Date(
              range.to.getFullYear() - 1,
              range.to.getMonth(),
              range.to.getDate(),
            )
            : undefined,
        };
        setRangeCompare(rangeCompare);
      }
    };

    const checkPreset = (): void => {
      for (const preset of PRESETS) {
        const presetRange = getPresetRange(preset.name);

        const normalizedRangeFrom = new Date(range.from);
        normalizedRangeFrom.setHours(0, 0, 0, 0);
        const normalizedPresetFrom = new Date(
          presetRange.from.setHours(0, 0, 0, 0),
        );

        const normalizedRangeTo = new Date(range.to ?? 0);
        normalizedRangeTo.setHours(0, 0, 0, 0);
        const normalizedPresetTo = new Date(
          presetRange.to?.setHours(0, 0, 0, 0) ?? 0,
        );

        if (
          normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
          normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
        ) {
          setSelectedPreset(preset.name);
          return;
        }
      }

      setSelectedPreset(undefined);
    };

    const resetValues = (): void => {
      setRange({
        from:
          typeof initialDateFrom === "string"
            ? getDateAdjustedForTimezone(initialDateFrom)
            : initialDateFrom,
        to: initialDateTo
          ? typeof initialDateTo === "string"
            ? getDateAdjustedForTimezone(initialDateTo)
            : initialDateTo
          : typeof initialDateFrom === "string"
            ? getDateAdjustedForTimezone(initialDateFrom)
            : initialDateFrom,
      });
      setRangeCompare(
        initialCompareFrom
          ? {
            from:
              typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
            to: initialCompareTo
              ? typeof initialCompareTo === "string"
                ? getDateAdjustedForTimezone(initialCompareTo)
                : initialCompareTo
              : typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
          }
          : undefined,
      );
    };

    useEffect(() => {
      checkPreset();
    }, [range]);

    const PresetButton = ({
      preset,
      label,
      isSelected,
    }: {
      preset: string;
      label: string;
      isSelected: boolean;
    }): JSX.Element => (
      <Button
        className={cn(isSelected && "pointer-events-none")}
        variant="ghost"
        onClick={() => {
          setPreset(preset);
        }}
      >
        <>
          <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
            <CheckIcon width={18} height={18} />
          </span>
          {label}
        </>
      </Button>
    );

    // Helper function to check if two date ranges are equal
    const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
      if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
      return (
        a.from.getTime() === b.from.getTime() &&
        (!a.to || !b.to || a.to.getTime() === b.to.getTime())
      );
    };

    useEffect(() => {
      if (isOpen) {
        openedRangeRef.current = range;
        openedRangeCompareRef.current = rangeCompare;
      }
    }, [isOpen]);

    return (
      <>
        <>
          <div className="flex py-2 justify-center items-center">
            <div className="flex">
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
                  {showCompare && (
                    <div className="flex items-center space-x-2 pr-4 py-1">
                      <Switch
                        defaultChecked={Boolean(rangeCompare)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            if (!range.to) {
                              setRange({
                                from: range.from,
                                to: range.from,
                              });
                            }
                            setRangeCompare({
                              from: new Date(
                                range.from.getFullYear(),
                                range.from.getMonth(),
                                range.from.getDate() - 365,
                              ),
                              to: range.to
                                ? new Date(
                                  range.to.getFullYear() - 1,
                                  range.to.getMonth(),
                                  range.to.getDate(),
                                )
                                : new Date(
                                  range.from.getFullYear() - 1,
                                  range.from.getMonth(),
                                  range.from.getDate(),
                                ),
                            });
                          } else {
                            setRangeCompare(undefined);
                          }
                        }}
                        id="compare-mode"
                      />
                      <Label htmlFor="compare-mode">Compare</Label>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <DateInput
                        value={range.from}
                        onChange={(date) => {
                          const toDate =
                            range.to == null || date > range.to ? date : range.to;
                          setRange((prevRange) => ({
                            ...prevRange,
                            from: date,
                            to: toDate,
                          }));
                        }}
                      />
                      <div className="py-1">-</div>
                      <DateInput
                        value={range.to}
                        onChange={(date) => {
                          const fromDate = date < range.from ? date : range.from;
                          setRange((prevRange) => ({
                            ...prevRange,
                            from: fromDate,
                            to: date,
                          }));
                        }}
                      />
                    </div>
                    {rangeCompare != null && (
                      <div className="flex gap-2">
                        <DateInput
                          value={rangeCompare?.from}
                          onChange={(date) => {
                            if (rangeCompare) {
                              const compareToDate =
                                rangeCompare.to == null || date > rangeCompare.to
                                  ? date
                                  : rangeCompare.to;
                              setRangeCompare((prevRangeCompare) => ({
                                ...prevRangeCompare,
                                from: date,
                                to: compareToDate,
                              }));
                            } else {
                              setRangeCompare({
                                from: date,
                                to: new Date(),
                              });
                            }
                          }}
                        />
                        <div className="py-1">-</div>
                        <DateInput
                          value={rangeCompare?.to}
                          onChange={(date) => {
                            if (rangeCompare?.from) {
                              const compareFromDate =
                                date < rangeCompare.from
                                  ? date
                                  : rangeCompare.from;
                              setRangeCompare({
                                ...rangeCompare,
                                from: compareFromDate,
                                to: date,
                              });
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {isSmallScreen && (
                  <Select
                    defaultValue={selectedPreset}
                    onValueChange={(value) => {
                      setPreset(value);
                    }}
                  >
                    <SelectTrigger className="w-[180px] mx-auto mb-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESETS.map((preset) => (
                        <SelectItem key={preset.name} value={preset.name}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <div>
                  <Calendar
                    {...calendarProps}
                    mode="range"
                    onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                      if (value?.from != null) {
                        console.log(blockStart, initialDateFrom);
                        console.log({ from: blockStart ? getDateAdjustedForTimezone(initialDateFrom) : value.from, to: value?.to });
                        setRange({ from: blockStart ? getDateAdjustedForTimezone(initialDateFrom) : value.from, to: value?.to });
                      }
                    }}
                    selected={range}
                    numberOfMonths={isSmallScreen ? 1 : 2}
                    defaultMonth={
                      new Date(
                        new Date().setMonth(
                          new Date().getMonth() - (isSmallScreen ? 0 : 1),
                        ),
                      )
                    }
                  />
                </div>
              </div>
            </div>
            {!isSmallScreen && (
              <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">
                <div className="flex w-full flex-col items-end gap-1 pr-2 pl-6 pb-6">
                  {PRESETS.map((preset) => (
                    <PresetButton
                      key={preset.name}
                      preset={preset.name}
                      label={preset.label}
                      isSelected={selectedPreset === preset.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 py-2 pr-4">
            <Button
              onClick={() => {
                setIsOpen(false);
                resetValues();
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                if (
                  !areRangesEqual(range, openedRangeRef.current) ||
                  !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
                ) {
                  onUpdate?.({ range, rangeCompare });
                }
              }}
            >
              {labelButton}
            </Button>
          </div>
        </>
      </>
    );
  };

DateRangePicker2.displayName = "DateRangePicker";
DateRangePicker2.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx";
