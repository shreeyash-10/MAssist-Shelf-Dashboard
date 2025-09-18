import React, { useMemo, useRef, useState } from "react";
import { Button, Card } from "../components/ui";
import Pill from "../components/ui/Pill";
import useApiRequest from "../hooks/useApiRequest";
import { addNewProduct } from "../services/apiService";

const brandOptions = [
  { name: "Lays", emoji: "🥔" },
  { name: "Doritos", emoji: "🔺" },
  { name: "Kurkure", emoji: "🌶️" },
  { name: "Pringles", emoji: "🟢" },
];

const TrainingUploadPage = ({ setPage, selectedBrand, selectedSku, setSelectedSku }) => {
  const [step, setStep] = useState("logo");
  const [brand, setBrand] = useState(selectedBrand || selectedSku?.brand || "Lays");
  const [files, setFiles] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const inputRef = useRef(null);
  const { execute: submitProduct, loading: submitting, error: submissionError } = useApiRequest(addNewProduct);

  const skuIdentifier = useMemo(() => selectedSku?.id || brand, [selectedSku, brand]);

  const onDrop = (event) => {
    event.preventDefault();
    const items = Array.from(event.dataTransfer.files || []);
    if (items.length) {
      setFiles((previous) => [...previous, ...items]);
    }
  };

  const onPick = (event) => {
    const items = Array.from(event.target.files || []);
    if (items.length) {
      setFiles((previous) => [...previous, ...items]);
    }
  };

  const removeAt = (index) => {
    setFiles((previous) => previous.filter((_, idx) => idx !== index));
  };

  const reset = () => {
    setFiles([]);
    setSubmissionMessage("");
    setSelectedSku?.(null);
    setStep("logo");
  };

  const queueForTraining = async () => {
    if (!files.length) return;
    try {
      await submitProduct(skuIdentifier, files);
      setSubmissionMessage("Images queued for training. You can review progress in the Analysis Reports section.");
      setStep("done");
    } catch {
      setSubmissionMessage("Unable to upload right now. Please try again.");
    }
  };

  return (
    <div className="content-auto">
      <Card
        title="SKU Image Upload"
        subtitle="Confirm the brand logo, collect the right shots, and push images directly into the training queue."
      >
        {step === "logo" && (
          <div className="space-y-6">
            <p className="text-sm text-muted">
              Select the SKU family you are about to train. This keeps the downstream annotations and reports in sync.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {brandOptions.map((option) => {
                const active = option.name === brand;
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      setBrand(option.name);
                      setSelectedSku?.(selectedSku ? { ...selectedSku, brand: option.name } : null);
                    }}
                    className={`glass rounded-2xl border px-4 py-5 text-center transition duration-200 ease-brand ${
                      active ? "border-black bg-black/10" : "border-black/20 hover:bg-black/8"
                    }`}
                  >
                    <div className="mb-2 text-3xl" aria-hidden>
                      {option.emoji}
                    </div>
                    <div className="text-sm font-semibold tracking-wide">{option.name}</div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setStep("upload")} aria-label="Confirm selected brand and continue">
                Confirm & Continue
              </Button>
              <Button variant="secondary" onClick={() => setPage("training")}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {step === "upload" && (
          <div className="space-y-6">
            <div
              className="glass rounded-2xl border border-dashed border-black/20 bg-white px-6 py-12 text-center"
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
            >
              <div className="text-lg font-semibold">Drag & drop images here</div>
              <p className="mt-2 text-sm text-muted">JPEG or PNG, minimum 1024px wide. You can add up to 50 files at once.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button onClick={() => inputRef.current?.click()} aria-label="Browse files">
                  Browse Files
                </Button>
                <Pill onClick={reset}>Reset selection</Pill>
              </div>
              <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onPick} />
            </div>

            {files.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-semibold">
                  Selected images <span>({files.length})</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="glass rounded-xl border border-black/15 bg-white p-4">
                      <div className="truncate text-sm">{file.name}</div>
                      <div className="text-xs text-muted">{Math.ceil((file.size || 0) / 1024)} KB</div>
                      <div className="mt-3">
                        <Button variant="secondary" onClick={() => removeAt(index)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submissionError && (
              <div className="rounded-xl border border-black/20 bg-white p-3 text-sm">
                {submissionError.payload?.detail ?? submissionError.message ?? "Upload failed."}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={queueForTraining} disabled={submitting || files.length === 0}>
                {submitting ? "Queuing..." : "Queue for Training"}
              </Button>
              <Button variant="secondary" onClick={() => setStep("logo")}>Back</Button>
              <Button variant="ghost" onClick={() => setPage("training")}>Cancel</Button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-6">
            <div className="glass rounded-2xl border border-black/15 bg-white p-6">
              <h2 className="text-xl font-semibold">Upload submitted</h2>
              <p className="mt-2 text-sm">{submissionMessage}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setPage("training")}>Back to Training</Button>
              <Button variant="secondary" onClick={() => setStep("upload")}>Upload more</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrainingUploadPage;
