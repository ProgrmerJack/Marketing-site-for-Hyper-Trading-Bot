"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Zap, ZapOff, MousePointer2, Image as ImageIcon } from "lucide-react";
import clsx from "clsx";
import { useMotion } from "./MotionProvider";

const MODE_OPTIONS = [
	{
		value: "system" as const,
		label: "Auto",
		description: "Follow device setting",
		icon: Sparkles,
	},
	{
		value: "enabled" as const,
		label: "Enable",
		description: "Full experience",
		icon: Zap,
	},
	{
		value: "reduced" as const,
		label: "Reduce",
		description: "Minimal motion",
		icon: ZapOff,
	},
];

const INTENSITY_OPTIONS = [
	{ value: "low" as const, label: "Low" },
	{ value: "standard" as const, label: "Balanced" },
	{ value: "high" as const, label: "High" },
];

export function MotionToggle() {
	const {
		preferences,
		setMotionPrefs,
		systemPrefersReduced,
		shouldReduceMotion,
		intensity,
		backgroundsEnabled, // Corrected property name from `backgroundEnabled` to `backgroundsEnabled`
		cursorEnabled,
	} = useMotion();

	const systemCopy = systemPrefersReduced
		? "System prefers reduced motion"
		: "System allows motion";
	const reducedCopy = shouldReduceMotion
		? "Animations are currently limited to protect comfort."
		: "Animations are active and tuned for clarity.";

	return (
		<section
			aria-label="Motion preferences"
			className="rounded-2xl border border-[color:var(--color-line-muted)]/50 bg-gradient-to-br from-white/90 to-white/60 p-6 shadow-sm transition-all dark:from-black/30 dark:to-black/10"
		>
			<header className="space-y-1">
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-surface-500)] dark:text-[color:var(--color-surface-400)]">
					Accessibility Preferences
				</p>
				<h3 className="text-lg font-semibold text-[color:var(--color-surface-900)] dark:text-white">
					Motion Controls
				</h3>
				<p className="text-sm text-[color:var(--color-surface-600)] dark:text-[color:var(--color-surface-400)]">
					{systemCopy}
				</p>
			</header>

			<div className="mt-5 space-y-6">
				<div>
					<span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-surface-500)] dark:text-[color:var(--color-surface-400)]">
						Mode
					</span>
					<div className="mt-3 grid gap-2">
						{MODE_OPTIONS.map((option) => {
							const Icon = option.icon;
							const selected = preferences.mode === option.value;

							return (
								<button
									key={option.value}
									type="button"
									aria-pressed={selected}
									onClick={() => setMotionPrefs({ mode: option.value })}
									className={clsx(
										"relative flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all",
										selected
											? "border-[color:var(--color-accent-primary)] bg-[color:var(--color-accent-primary)]/12 shadow-sm"
											: "border-[color:var(--color-line-muted)]/60 hover:border-[color:var(--color-accent-primary)]/60 hover:bg-white/50 dark:hover:bg-white/10",
									)}
								>
									<AnimatePresence>
										{selected ? (
											<motion.span
												layoutId="motion-mode-pill"
												className="pointer-events-none absolute inset-0 rounded-xl bg-[color:var(--color-accent-primary)]/10"
												transition={{ type: "spring", stiffness: 300, damping: 40 }}
											/>
										) : null}
									</AnimatePresence>
									<span
										className={clsx(
											"relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
											selected
												? "bg-[color:var(--color-accent-primary)]/20 text-[color:var(--color-accent-primary)]"
												: "bg-[color:var(--color-surface-100)] text-[color:var(--color-surface-600)] dark:bg-[color:var(--color-surface-800)] dark:text-[color:var(--color-surface-400)]",
										)}
									>
										<Icon className="h-5 w-5" aria-hidden />
									</span>
									<span className="relative flex flex-col">
										<span
											className={clsx(
												"text-sm font-semibold",
												selected
													? "text-[color:var(--color-accent-primary)]"
													: "text-[color:var(--color-surface-900)] dark:text-white",
											)}
										>
											{option.label}
										</span>
										<span className="text-xs text-[color:var(--color-surface-500)] dark:text-[color:var(--color-surface-400)]">
											{option.description}
										</span>
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div>
					<span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-surface-500)] dark:text-[color:var(--color-surface-400)]">
						Intensity
					</span>
					<div className="mt-3 flex flex-wrap gap-2">
						{INTENSITY_OPTIONS.map((option) => {
							const disabled = shouldReduceMotion && option.value !== "low";
							const selected = intensity === option.value && !disabled;

							return (
								<button
									key={option.value}
									type="button"
									disabled={disabled}
									onClick={() => setMotionPrefs({ intensity: option.value })}
									className={clsx(
										"relative rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-primary)]",
										disabled
											? "cursor-not-allowed border border-dashed border-[color:var(--color-line-muted)]/70 text-[color:var(--color-surface-400)]"
											: selected
												? "border border-[color:var(--color-accent-primary)] bg-[color:var(--color-accent-primary)]/10 text-[color:var(--color-accent-primary)] shadow-sm"
												: "border border-[color:var(--color-line-muted)]/60 text-[color:var(--color-surface-700)] hover:border-[color:var(--color-accent-primary)]/60 hover:text-[color:var(--color-accent-primary)] dark:text-white/80",
									)}
								>
									{option.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="grid gap-3">
					<ToggleRow
						icon={ImageIcon}
						label="Background motion"
						description="Animated canvases, gradients, and depth layers."
						checked={backgroundsEnabled}
						forcedOff={shouldReduceMotion}
						onChange={(value) => setMotionPrefs({ backgrounds: value })}
					/>
					<ToggleRow
						icon={MousePointer2}
						label="Pointer effects"
						description="Cursor trails, magnetic cards, spark interactions."
						checked={cursorEnabled}
						forcedOff={shouldReduceMotion}
						onChange={(value) => setMotionPrefs({ cursor: value })}
					/>
				</div>
			</div>

			<footer className="mt-6 rounded-xl bg-[color:var(--color-surface-100)]/60 p-4 text-xs text-[color:var(--color-surface-600)] dark:bg-white/5 dark:text-[color:var(--color-surface-400)]">
				<span className="font-semibold text-[color:var(--color-surface-800)] dark:text-white">
					Status:
				</span>{" "}
				{reducedCopy}
			</footer>
		</section>
	);
}

type ToggleRowProps = {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	description: string;
	checked: boolean;
	forcedOff: boolean;
	onChange: (value: boolean) => void;
};

function ToggleRow({
	icon: Icon,
	label,
	description,
	checked,
	onChange,
	forcedOff,
}: ToggleRowProps) {
	const disabled = forcedOff;
	const active = checked && !disabled;

	return (
		<div
			className={clsx(
				"flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition",
				active
					? "border-[color:var(--color-accent-primary)] bg-[color:var(--color-accent-primary)]/8"
					: "border-[color:var(--color-line-muted)]/60",
				disabled ? "opacity-60" : "hover:border-[color:var(--color-accent-primary)]/60",
			)}
		>
			<div className="flex items-start gap-3">
				<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-surface-100)] text-[color:var(--color-surface-600)] dark:bg-[color:var(--color-surface-800)] dark:text-[color:var(--color-surface-400)]">
					<Icon className="h-4 w-4" aria-hidden />
				</span>
				<div>
					<p className="text-sm font-semibold text-[color:var(--color-surface-900)] dark:text-white">
						{label}
					</p>
					<p className="text-xs text-[color:var(--color-surface-500)] dark:text-[color:var(--color-surface-400)]">
						{description}
					</p>
				</div>
			</div>
			<button
				type="button"
				role="switch"
				aria-checked={active}
				disabled={disabled}
				onClick={() => onChange(!checked)}
				className={clsx(
					"relative h-6 w-12 rounded-full border transition-colors",
					active
						? "border-[color:var(--color-accent-primary)] bg-[color:var(--color-accent-primary)]"
						: "border-[color:var(--color-line-muted)] bg-[color:var(--color-surface-100)] dark:bg-[color:var(--color-surface-800)]",
					disabled ? "cursor-not-allowed" : "cursor-pointer",
				)}
			>
				<span
					aria-hidden
					className={clsx(
						"absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full bg-white shadow transition-all",
						active ? "translate-x-6" : "translate-x-1",
					)}
				/>
			</button>
		</div>
	);
}

