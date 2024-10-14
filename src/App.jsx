import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Wallet, Link, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import './App.css'; // Tambahkan CSS eksternal

const App = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="app-container">
      <div style={{backgroundColor:'#1e40af'}} className="status-bar">
        {isConnected ? "Connected to $Ridwan" : "Disconnected"}
      </div>

      <div className="content-container">
        <h1 className="title">Simple Connect Ridwan </h1>
        
        <div className="button-group">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              return (
                <div
                  {...(!mounted && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!mounted || !account || !chain) {
                      return (
                        <button onClick={openConnectModal} type="button" className="button connect-button">
                          <Wallet className="icon" size={24} />
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button" className="button switch-button">
                          <AlertCircle className="icon" size={24} />
                          Switch Network
                        </button>
                      );
                    }

                    return (
                      <div className="account-buttons">
                        <button onClick={openChainModal} className="button chain-button">
                          {chain.hasIcon && (
                            <div className="icon-container">
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  className="icon"
                                />
                              )}
                            </div>
                          )}
                          <span>{chain.name}</span>
                        </button>

                        <button onClick={openAccountModal} type="button" className="button account-button">
                          <Link className="icon" size={24} />
                          {account.displayName}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>

          <div className="wallet-status">
            <h2 className="status-title">Wallet Status</h2>
            <div className="status-indicator">
              <div  className={`status-icon ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </div>
              <span style={{color:'#1e40af'}}>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            {isConnected && address && (
              <div style={{backgroundColor:'#1e40af'}} className="wallet-address">
                <p>
                  <strong>Address:</strong> {address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
