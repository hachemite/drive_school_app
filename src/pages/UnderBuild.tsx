import React from 'react';
import { useHistory } from 'react-router-dom';

export const UnderBuild: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <div className="under-build-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div className="under-build-content" style={{
          maxWidth: '600px'
        }}>
          <div className="icon" style={{
            fontSize: '80px',
            marginBottom: '30px'
          }}>🚧</div>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: '#333'
          }}>Under Construction</h1>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#555'
          }}>We're working hard to bring you this feature soon!</h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '30px',
            color: '#666'
          }}>This page is currently in development. Please check back later for updates.</p>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onClick={() => history.goBack()}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export {};