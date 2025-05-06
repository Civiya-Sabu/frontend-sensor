import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import styles from './UserFlow.module.css'; // <<-- import the css module

const nodes = [
  { id: '1', type: 'input', data: { label: '📧 User Email Input' }, position: { x: 0, y: 50 } },
  { id: '2', data: { label: '📨 Send OTP' }, position: { x: 250, y: 50 } },
  { id: '3', data: { label: '✅ Verify OTP' }, position: { x: 500, y: 50 } },
  { id: '4', data: { label: '📝 Register User' }, position: { x: 750, y: 50 } },
  { id: '5', type: 'output', data: { label: '🔓 Login Success' }, position: { x: 1000, y: 50 } }
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true }
];

const UserFlow = () => {
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className={styles.flowContainer}>
      <h3 className={styles.flowTitle}>User Registration Flow</h3>

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
