import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import { dummyStudents } from '../../data/students'
import type { Student } from '../../types/student'

export default function Students() {
  const [students] = useState<Student[]>(dummyStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    studentId: '',
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      key: 'studentId',
      header: 'NIS',
      render: (row: Student) => (
        <span className="font-mono text-sm">{row.studentId}</span>
      ),
    },
    {
      key: 'name',
      header: 'Nama',
      render: (row: Student) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {row.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-text">{row.name}</p>
            <p className="text-xs text-text-secondary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'learningGroupIds',
      header: 'Learning Group',
      render: (row: Student) => (
        <div className="flex flex-wrap gap-1">
          {row.learningGroupIds.map((_, index) => (
            <Badge key={index} variant="default">
              Group {index + 1}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <Button size="sm" variant="ghost">
          Detail →
        </Button>
      ),
    },
  ]

  const handleAddStudent = () => {
    // TODO: Implement add logic
    setShowAddModal(false)
    setNewStudent({ name: '', email: '', studentId: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Siswa</h1>
          <p className="text-text-secondary mt-1">
            Kelola data siswa Anda
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          + Tambah Siswa
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari siswa berdasarkan nama atau NIS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={filteredStudents}
          emptyMessage="Tidak ada siswa ditemukan"
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Siswa</p>
            <p className="text-3xl font-bold text-primary mt-1">{students.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Learning Group</p>
            <p className="text-3xl font-bold text-primary mt-1">3</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-success mt-1">82</p>
          </div>
        </Card>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Tambah Siswa"
      >
        <div className="space-y-4">
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama siswa"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="siswa@email.com"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <Input
            label="NIS (Nomor Induk Siswa)"
            placeholder="Contoh: STU006"
            value={newStudent.studentId}
            onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button onClick={handleAddStudent}>Tambah Siswa</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
