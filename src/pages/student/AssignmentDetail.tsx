import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { dummyAssignments } from '../../data/assignments'
import { formatDate, formatRelativeDate, isOverdue } from '../../utils/formatDate'

export default function AssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    fileUrl: '',
    linkUrl: '',
  })

  const assignment = dummyAssignments.find((a) => a.id === id) || dummyAssignments[0]
  const overdue = isOverdue(assignment.deadline)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/student/assignments')}>
          ← Kembali ke Daftar Tugas
        </Button>

        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text mb-2">Tugas Berhasil Dikumpulkan!</h2>
            <p className="text-text-secondary mb-6">
              Tugas Anda sudah berhasil dikumpulkan. Menunggu penilaian dari pengajar.
            </p>
            <Button onClick={() => navigate('/student/assignments')}>
              Kembali ke Daftar Tugas
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/student/assignments')}>
          ← Kembali
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Detail Tugas</h1>
          <p className="text-text-secondary mt-1">Lihat dan kumpulkan tugas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Info */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{assignment.subject}</span>
                {overdue ? (
                  <Badge variant="danger">Terlambat</Badge>
                ) : (
                  <Badge variant="success">Aktif</Badge>
                )}
              </div>
              <h2 className="text-xl font-semibold text-text">{assignment.title}</h2>
              <p className="text-text-secondary">{assignment.description}</p>

              {assignment.attachment && (
                <div className="p-3 bg-background rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-primary">{assignment.attachment}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Submission Form */}
          <Card>
            <h3 className="font-semibold text-text mb-4">Kumpulkan Tugas</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {assignment.submissionType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Jawaban
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[200px]"
                    placeholder="Tulis jawaban Anda di sini..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>
              )}

              {assignment.submissionType === 'file' && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <svg className="w-8 h-8 mx-auto text-text-secondary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-text-secondary">
                      Drag & drop file atau{' '}
                      <span className="text-primary cursor-pointer">pilih file</span>
                    </p>
                    <p className="text-xs text-text-secondary mt-1">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                  </div>
                </div>
              )}

              {assignment.submissionType === 'link' && (
                <Input
                  label="Link"
                  type="url"
                  placeholder="https://..."
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  required
                />
              )}

              <Button type="submit" fullWidth loading={submitting}>
                Kumpulkan Tugas
              </Button>
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deadline Info */}
          <Card>
            <h3 className="font-semibold text-text mb-4">Informasi</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Deadline</span>
                <span className="text-sm font-medium text-text">{formatDate(assignment.deadline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Sisa Waktu</span>
                <span className={`text-sm font-medium ${overdue ? 'text-danger' : 'text-text'}`}>
                  {overdue ? 'Sudah lewat' : formatRelativeDate(assignment.deadline)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Tipe Submit</span>
                <Badge variant="default">{assignment.submissionType}</Badge>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card>
            <h3 className="font-semibold text-text mb-4">Tips</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Pastikan Anda membaca soal dengan teliti
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Periksa kembali jawaban sebelum mengumpulkan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Kumpulkan sebelum deadline untuk menghindari keterlambatan
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
