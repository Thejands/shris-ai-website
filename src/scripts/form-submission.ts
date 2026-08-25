type LeadSource = 'contact' | 'demo';

interface SubmitLeadOptions {
  source: LeadSource;
  form: HTMLFormElement;
  submitButton: HTMLButtonElement | null;
  successBox: HTMLElement | null;
  errorBox: HTMLElement | null;
  defaultButtonLabel: string;
  loadingLabel: string;
  getPayload: (form: HTMLFormElement) => Record<string, string>;
  onSuccess?: () => void;
}

function setButtonState(button: HTMLButtonElement | null, label: string, disabled: boolean): void {
  if (!button) return;
  button.disabled = disabled;
  button.innerHTML = `<span>${label}</span>`;
}

function showError(errorBox: HTMLElement | null, message: string): void {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.style.display = 'block';
}

function hideError(errorBox: HTMLElement | null): void {
  if (!errorBox) return;
  errorBox.textContent = '';
  errorBox.style.display = 'none';
}

export async function submitLeadForm(options: SubmitLeadOptions): Promise<void> {
  const {
    source,
    form,
    submitButton,
    successBox,
    errorBox,
    defaultButtonLabel,
    loadingLabel,
    getPayload,
    onSuccess,
  } = options;

  hideError(errorBox);
  setButtonState(submitButton, loadingLabel, true);

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        source,
        ...getPayload(form),
      }),
    });

    const result = (await response.json()) as { ok?: boolean; message?: string; referenceId?: string };

    if (!response.ok || !result.ok) {
      throw new Error(result.message ?? 'Submission failed. Please try again.');
    }

    form.style.display = 'none';
    if (successBox) {
      successBox.style.display = 'block';
      const reference = successBox.querySelector('[data-lead-reference]');
      if (reference && result.referenceId) {
        reference.textContent = `Reference: ${result.referenceId}`;
      }
    }

    onSuccess?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Submission failed. Please try again.';
    showError(errorBox, message);
  } finally {
    setButtonState(submitButton, defaultButtonLabel, false);
  }
}
