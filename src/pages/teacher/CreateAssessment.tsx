import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import type { QuestionType } from '../../types/assessment'

interface QuestionForm {
  id: string
  question: string
  type: QuestionType
  options: string[]
  correctAnswer: string
  score: number
}

export default function CreateAssessment() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    learningGroup: '',
    duration: 60,
    startDate: '',
    endDate: '',
  })

  const [questions, setQuestions] = useState<QuestionForm[]>([
    {
      id: '1',
      question: '',
      type: 'MULTIPLE_CHOICE',
      options: ['', '', '', ''],
      correctAnswer: '',
      score: 5,
    },
  ])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: String(questions.length + 1),
        question: '',
        type: 'MULTIPLE_CHOICE',
        options: ['', '', '', ''],
        correctAnswer: '',
        score: 5,
      },
    ])
  }

  const handleRemoveQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const handleQuestionChange = (id: string, field: string, value: string | number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    )
  }

  const handleOptionChange = (questionId: string, index: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options]
          newOptions[index] = value
          return { ...q, options: newOptions }
        }
        return q
      })
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    navigate('/teacher/assessments')
  }

  const totalScore = questions.reduce((sum, q) => sum + q.score, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/assessments')}
        >
          ← Kembali
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Buat Assessment</h1>
          <p className="text-text-secondary mt-1">
            Buat ujian atau evaluasi pembelajaran
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Info */}
            <Card>
              <h2 className="text-lg font-semibold text-text mb-4">Informasi Assessment</h2>
              <div className="space-y-4">
                <Input
                  label="Judul Assessment"
                  placeholder="Contoh: Ulangan Harian Matematika Bab 3"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[80px]"
                    placeholder="Deskripsi singkat tentang assessment ini..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Mata Pelajaran
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    >
                      <option value="">Pilih mata pelajaran</option>
                      <option value="Matematika">Matematika</option>
                      <option value="Bahasa Inggris">Bahasa Inggris</option>
                      <option value="Fisika">Fisika</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Learning Group
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      value={formData.learningGroup}
                      onChange={(e) => setFormData({ ...formData, learningGroup: e.target.value })}
                      required
                    >
                      <option value="">Pilih learning group</option>
                      <option value="lg-1">X IPA 1</option>
                      <option value="lg-2">Les Matematika Andi</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Durasi (menit)"
                    type="number"
                    placeholder="60"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    required
                  />
                  <Input
                    label="Tanggal Mulai"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                  <Input
                    label="Tanggal Selesai"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            {/* Questions */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text">Soal</h2>
                <Button size="sm" variant="outline" onClick={handleAddQuestion}>
                  + Tambah Soal
                </Button>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-4 border border-border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="info">Soal {index + 1}</Badge>
                        <select
                          className="px-2 py-1 border border-border rounded text-sm"
                          value={question.type}
                          onChange={(e) =>
                            handleQuestionChange(question.id, 'type', e.target.value)
                          }
                        >
                          <option value="MULTIPLE_CHOICE">Pilihan Ganda</option>
                          <option value="ESSAY">Essay</option>
                        </select>
                      </div>
                      {questions.length > 1 && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleRemoveQuestion(question.id)}
                        >
                          Hapus
                        </Button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Pertanyaan
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Tulis pertanyaan di sini..."
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(question.id, 'question', e.target.value)
                        }
                        rows={2}
                      />
                    </div>

                    {question.type === 'MULTIPLE_CHOICE' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-text">
                          Pilihan Jawaban
                        </label>
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <span className="w-8 h-8 flex items-center justify-center bg-background rounded text-sm font-medium">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                              placeholder={`Pilihan ${String.fromCharCode(65 + optIndex)}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(question.id, optIndex, e.target.value)
                              }
                            />
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === option}
                              onChange={() =>
                                handleQuestionChange(question.id, 'correctAnswer', option)
                              }
                              className="w-4 h-4"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-text-secondary">
                          Pilih radio button untuk menandai jawaban yang benar
                        </p>
                      </div>
                    )}

                    <div className="w-32">
                      <Input
                        label="Skor"
                        type="number"
                        placeholder="5"
                        value={question.score}
                        onChange={(e) =>
                          handleQuestionChange(question.id, 'score', Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <h3 className="font-semibold text-text mb-4">Ringkasan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Jumlah Soal</span>
                  <span className="text-sm font-medium text-text">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Total Skor</span>
                  <span className="text-sm font-medium text-text">{totalScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Durasi</span>
                  <span className="text-sm font-medium text-text">{formData.duration} menit</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <div className="space-y-3">
                <Button type="submit" fullWidth loading={loading}>
                  Simpan Assessment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/teacher/assessments')}
                >
                  Batal
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
