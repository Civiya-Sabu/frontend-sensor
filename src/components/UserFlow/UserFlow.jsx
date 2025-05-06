import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import styles from './UserFlow.module.css';
import { useUserFlow } from '../../context/UserFlowContext';
import { useAuth } from '../../context/AuthContext'; // ✅ Import Auth

const defaultNodes = [
  { id: '1', type: 'input', data: { label: '📧 User Email Input' }, position: { x: 0, y: 50 } },
  { id: '2', data: { label: '📨 Send OTP' }, position: { x: 250, y: 50 } },
  { id: '3', data: { label: '✅ Verify OTP' }, position: { x: 500, y: 50 } },
  { id: '4', data: { label: '📝 Register User' }, position: { x: 750, y: 50 } },
  { id: '5', type: 'output', data: { label: '🔓 Login Success' }, position: { x: 1000, y: 50 } }
];

const defaultEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true }
];

const UserFlow = () => {
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const { saveUserFlow, getUserFlow, deleteUserFlow } = useUserFlow();
  const { user } = useAuth(); // ✅ Get user from context
  const userId = user?.id || 'demo-user-id'; // fallback if not logged in

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNode(null);
  };

  useEffect(() => {
    setNodes(defaultNodes);
    setEdges(defaultEdges);
  }, []);

  const handleSaveFlow = async () => {
    const result = await saveUserFlow(userId, { nodes, edges });
    alert(result.success ? 'Flow saved!' : result.message);
  };

  const handleLoadFlow = async () => {
    const result = await getUserFlow(userId);
    if (result.success && result.flow) {
      setNodes(result.flow.nodes || []);
      setEdges(result.flow.edges || []);
    } else {
      alert(result.message || 'No flow found.');
    }
  };

  const handleDeleteFlow = async () => {
    const result = await deleteUserFlow(userId);
    if (result.success) {
      setNodes([]);
      setEdges([]);
      alert('Flow deleted.');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={styles.flowContainer}>
      <h3 className={styles.flowTitle}>User Registration Flow</h3>

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleSaveFlow} style={{ marginRight: '10px' }}>
          Save Flow
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLoadFlow} style={{ marginRight: '10px' }}>
          Load Flow
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteFlow}>
          Delete Flow
        </Button>
      </div>

      <div className={styles.reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background gap={16} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={styles.modalTitle}>Node Details</DialogTitle>
        <DialogContent className={styles.modalContent}>
          {selectedNode && (
            <div>
              <p><strong>ID:</strong> {selectedNode.id}</p>
              <p><strong>Label:</strong> {selectedNode.data.label}</p>
              <p><strong>Position:</strong> ({selectedNode.position.x}, {selectedNode.position.y})</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={styles.modalButton}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserFlow;
