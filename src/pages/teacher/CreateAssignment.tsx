import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import type { SubmissionType } from '../../types/assignment'

export default function CreateAssignment() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    learningGroup: '',
    deadline: '',
    submissionType: 'file' as SubmissionType,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    navigate('/teacher/assignments')
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/assignments')}
        >
          ← Kembali
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Buat Tugas Baru</h1>
          <p className="text-text-secondary mt-1">
            Buat tugas untuk siswa Anda
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-6">
            {/* Title */}
            <Input
              label="Judul Tugas"
              placeholder="Contoh: Persamaan Linear"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Deskripsi
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px]"
                placeholder="Jelaskan tugas yang harus dikerjakan siswa..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </div>

            {/* Subject & Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Mata Pelajaran
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                >
                  <option value="">Pilih mata pelajaran</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Sejarah">Sejarah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Learning Group
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  value={formData.learningGroup}
                  onChange={(e) => handleChange('learningGroup', e.target.value)}
                  required
                >
                  <option value="">Pilih learning group</option>
                  <option value="lg-1">X IPA 1</option>
                  <option value="lg-2">Les Matematika Andi</option>
                  <option value="lg-3">Kelompok Belajar Bahasa Inggris</option>
                </select>
              </div>
            </div>

            {/* Deadline & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Tipe Submission
                </label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  value={formData.submissionType}
                  onChange={(e) => handleChange('submissionType', e.target.value)}
                >
                  <option value="file">File Upload</option>
                  <option value="text">Text</option>
                  <option value="link">Link</option>
                </select>
              </div>
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Lampiran (Opsional)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <svg
                  className="w-8 h-8 mx-auto text-text-secondary mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-text-secondary">
                  Drag & drop file atau{' '}
                  <span className="text-primary cursor-pointer">pilih file</span>
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  PDF, DOC, DOCX, JPG, PNG (max 10MB)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/teacher/assignments')}
              >
                Batal
              </Button>
              <Button type="submit" loading={loading}>
                Buat Tugas
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
