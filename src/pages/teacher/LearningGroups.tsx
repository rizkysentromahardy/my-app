import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import EmptyState from '../../components/common/EmptyState'

interface LearningGroup {
  id: string
  name: string
  subject: string
  studentCount: number
  activeAssignments: number
  description: string
}

const dummyGroups: LearningGroup[] = [
  {
    id: '1',
    name: 'X IPA 1',
    subject: 'Matematika',
    studentCount: 32,
    activeAssignments: 3,
    description: 'Kelas Matematika untuk siswa X IPA 1',
  },
  {
    id: '2',
    name: 'Les Matematika Andi',
    subject: 'Matematika',
    studentCount: 5,
    activeAssignments: 1,
    description: 'Les privat Matematika untuk Andi',
  },
  {
    id: '3',
    name: 'Kelompok Belajar Bahasa Inggris',
    subject: 'Bahasa Inggris',
    studentCount: 8,
    activeAssignments: 2,
    description: 'Kelompok belajar Bahasa Inggris',
  },
]

export default function LearningGroups() {
  const [groups] = useState<LearningGroup[]>(dummyGroups)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    description: '',
  })

  const handleCreate = () => {
    // TODO: Implement create logic
    setShowCreateModal(false)
    setNewGroup({ name: '', subject: '', description: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Learning Group</h1>
          <p className="text-text-secondary mt-1">
            Kelola kelompok belajar Anda
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          + Buat Group
        </Button>
      </div>

      {/* Groups Grid */}
      {groups.length === 0 ? (
        <EmptyState
          title="Belum ada Learning Group"
          description="Buat learning group pertama Anda untuk memulai"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Buat Group
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-text">{group.name}</h3>
                    <p className="text-sm text-primary">{group.subject}</p>
                  </div>
                  <Badge variant="info">{group.studentCount} siswa</Badge>
                </div>
                <p className="text-sm text-text-secondary">{group.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-text-secondary">
                    {group.activeAssignments} tugas aktif
                  </span>
                  <Button size="sm" variant="ghost">
                    Lihat Detail →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Buat Learning Group"
      >
        <div className="space-y-4">
          <Input
            label="Nama Group"
            placeholder="Contoh: X IPA 1"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <Input
            label="Mata Pelajaran"
            placeholder="Contoh: Matematika"
            value={newGroup.subject}
            onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
          />
          <Input
            label="Deskripsi (Opsional)"
            placeholder="Deskripsi singkat tentang group ini"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Batal
            </Button>
            <Button onClick={handleCreate}>Buat Group</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
