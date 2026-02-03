'use client';

import { useState, useRef } from 'react';
import { Card, Badge, Button, Tag } from '@/components/ui';
import { sampleDatasets, uploadTypes } from '@/lib/mock-data';
import { Upload, Check, FileText, Link as LinkIcon, FileSpreadsheet, X } from 'lucide-react';
import Link from 'next/link';

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

export default function AddDataPage() {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['cta_landing_pages']);
  const [activeFileType, setActiveFileType] = useState<'CSV' | 'JSON' | 'URL list'>('CSV');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDataset = (id: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || 'unknown',
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadTypeClick = (typeId: string) => {
    setSelectedUploadType(typeId === selectedUploadType ? null : typeId);
    // Simulate adding a template file
    if (typeId !== selectedUploadType) {
      const type = uploadTypes.find((t) => t.id === typeId);
      if (type) {
        setUploadedFiles((prev) => [
          ...prev,
          { name: `${type.name.toLowerCase().replace(/\s+/g, '_')}_template.${activeFileType.toLowerCase().replace(' list', '')}`, size: '2.4 KB', type: activeFileType },
        ]);
      }
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">
          Add Data (Optional)
        </h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          Upload your data or use a canned dataset to consolidate + normalize.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload datasets */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)] mb-2">
            Upload datasets
          </h2>
          <p className="text-sm text-[var(--mxp-gray-500)] mb-4">
            Bring exports or catalogs to align creatives → offers.
          </p>

          {/* File type toggles */}
          <div className="flex gap-2 mb-4">
            {(['CSV', 'JSON', 'URL list'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveFileType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFileType === type
                    ? 'bg-[var(--mxp-gray-200)] text-[var(--mxp-gray-700)]'
                    : 'bg-[var(--mxp-gray-100)] text-[var(--mxp-gray-500)] hover:bg-[var(--mxp-gray-200)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={activeFileType === 'CSV' ? '.csv' : activeFileType === 'JSON' ? '.json' : '.txt'}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleBrowseClick}
            className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors cursor-pointer ${
              isDragging
                ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple-light)]/20'
                : 'border-[var(--mxp-gray-300)] hover:border-[var(--mxp-purple)]'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-[var(--mxp-purple)]' : 'text-[var(--mxp-gray-400)]'}`} />
              <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                {isDragging ? 'Drop files here' : 'Drag & drop files here'}
              </p>
              <p className="text-xs text-[var(--mxp-gray-500)]">or browse to upload</p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={handleBrowseClick}>
                Browse files
              </Button>
            </div>
          </div>

          {/* Uploaded files list */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium text-[var(--mxp-gray-600)]">
                Uploaded files ({uploadedFiles.length})
              </p>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-[var(--mxp-gray-50)] rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--mxp-gray-500)]" />
                    <span className="text-sm text-[var(--mxp-gray-700)]">{file.name}</span>
                    <span className="text-xs text-[var(--mxp-gray-400)]">({file.size})</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-[var(--mxp-gray-200)] rounded"
                  >
                    <X className="w-4 h-4 text-[var(--mxp-gray-500)]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Suggested uploads */}
          <div>
            <p className="text-sm font-medium text-[var(--mxp-gray-600)] mb-3">
              Suggested (most common)
            </p>
            <div className="space-y-2">
              {uploadTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => handleUploadTypeClick(type.id)}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-colors cursor-pointer ${
                    selectedUploadType === type.id
                      ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple-light)]/30'
                      : 'border-[var(--mxp-gray-200)] hover:border-[var(--mxp-purple)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedUploadType === type.id ? 'bg-[var(--mxp-purple-light)]' : 'bg-[var(--mxp-gray-100)]'
                    }`}>
                      {type.id === 'platform_performance' && (
                        <FileSpreadsheet className={`w-4 h-4 ${selectedUploadType === type.id ? 'text-[var(--mxp-purple)]' : 'text-[var(--mxp-gray-500)]'}`} />
                      )}
                      {type.id === 'product_catalog' && (
                        <FileText className={`w-4 h-4 ${selectedUploadType === type.id ? 'text-[var(--mxp-purple)]' : 'text-[var(--mxp-gray-500)]'}`} />
                      )}
                      {type.id === 'landing_pages' && (
                        <LinkIcon className={`w-4 h-4 ${selectedUploadType === type.id ? 'text-[var(--mxp-purple)]' : 'text-[var(--mxp-gray-500)]'}`} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                        {type.name}
                      </p>
                      <p className="text-xs text-[var(--mxp-gray-500)]">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--mxp-purple)] font-medium">
                      {'platforms' in type && type.platforms}
                      {'format' in type && type.format}
                      {'feature' in type && type.feature}
                    </span>
                    {selectedUploadType === type.id && (
                      <div className="w-5 h-5 rounded-full bg-[var(--mxp-purple)] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Sample datasets */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)] mb-2">
            Use sample dataset
          </h2>
          <p className="text-sm text-[var(--mxp-gray-500)] mb-4">
            Instantly show consolidation without needing customer files.
          </p>

          <div className="space-y-3">
            {sampleDatasets.map((dataset) => (
              <div
                key={dataset.id}
                onClick={() => toggleDataset(dataset.id)}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDatasets.includes(dataset.id)
                    ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple-light)]/30'
                    : 'border-[var(--mxp-gray-200)] hover:border-[var(--mxp-purple)]'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                    {dataset.name}
                  </p>
                  <p className="text-xs text-[var(--mxp-gray-500)]">{dataset.description}</p>
                  {dataset.recommended && (
                    <Badge variant="green" className="mt-2">
                      Recommended
                    </Badge>
                  )}
                  {dataset.optional && (
                    <Badge variant="gray" className="mt-2">
                      Optional
                    </Badge>
                  )}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedDatasets.includes(dataset.id)
                      ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple)]'
                      : 'border-[var(--mxp-gray-300)]'
                  }`}
                >
                  {selectedDatasets.includes(dataset.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTAs */}
      <div className="flex justify-end gap-3 mt-6">
        <Link href="/normalize">
          <Button variant="secondary">Skip for now</Button>
        </Link>
        <Link href="/normalize">
          <Button variant="primary">Ingest & Continue</Button>
        </Link>
      </div>
    </div>
  );
}
