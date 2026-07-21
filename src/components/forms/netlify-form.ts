type FormMessages = {
	pending: string;
	success: string;
	error: string;
};

/**
 * Submit a Netlify form without navigating away from the current page.
 * Native form submission remains available when JavaScript is unavailable.
 */
export function enhanceNetlifyForm(form: HTMLFormElement | null, messages: FormMessages): void {
	if (!form || form.dataset.enhanced === "true") {
		return;
	}

	const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const status = form.querySelector<HTMLElement>("[data-form-status]");

	if (!button || !status) {
		return;
	}

	const idleLabel = button.textContent?.trim() || "Submit";
	form.dataset.enhanced = "true";

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!form.reportValidity()) {
			return;
		}

		button.disabled = true;
		button.textContent = messages.pending;
		form.setAttribute("aria-busy", "true");
		form.removeAttribute("data-form-state");
		status.hidden = true;

		const payload = new URLSearchParams();
		new FormData(form).forEach((value, key) => payload.append(key, String(value)));

		try {
			const response = await fetch(form.action, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
				body: payload.toString(),
			});

			if (!response.ok) {
				throw new Error(`Form submission failed with status ${response.status}.`);
			}

			form.reset();
			form.dataset.formState = "success";
			status.textContent = messages.success;
			status.hidden = false;
		} catch {
			form.dataset.formState = "error";
			status.textContent = messages.error;
			status.hidden = false;
		} finally {
			button.disabled = false;
			button.textContent = idleLabel;
			form.removeAttribute("aria-busy");
		}
	});
}
