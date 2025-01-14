import { Form, Button, Col, Row, Stack, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotelistProps, SimpliFiedNote, Tag } from "../config";
import { useMemo, useState } from "react";
import StateManagedSelect from "react-select";
import styles from "../Homepage.module.css";
import { EditTagsModal } from "./EditTagsModal";

export default function HomePage({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NotelistProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const finteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((t) => t.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <h1>Notes</h1>
        <Col></Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setShowModal(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <StateManagedSelect
                className="text-dark"
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {finteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        availableTags={availableTags}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimpliFiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`text-dark h-100  text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flew-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
