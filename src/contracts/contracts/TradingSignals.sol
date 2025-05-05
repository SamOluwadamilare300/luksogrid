// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";


contract TradingSignals is LSP7DigitalAsset {
    struct Signal {
        address asset;
        string action;
        uint32 timeframe;
        uint128 priceTarget;
        uint16 confidenceLevel;
        bytes analysis;
        uint256 timestamp;
    }

    mapping(uint256 => Signal) public signals;
    uint256 public signalCount;

    event NewSignal(
        uint256 indexed signalId,
        address indexed asset,
        string action,
        uint32 timeframe,
        uint128 priceTarget,
        uint16 confidenceLevel,
        bytes analysis
    );

    // LSP7DigitalAsset constructor requires these parameters
    constructor()
        LSP7DigitalAsset(
            "TradingSignals", // name
            "SIGNAL",         // symbol
            msg.sender,       // owner
            0,                // lsp4TokenType (0 for fungible, 1 for NFT)
            false             // isNonDivisible
        )
    {}

    function createTradingSignal(
        address _asset,
        string memory _action,
        uint32 _timeframe,
        uint128 _priceTarget,
        uint16 _confidenceLevel,
        bytes calldata _analysis
    ) public {
        require(_asset != address(0), "Asset cannot be zero.");

        // Generate a unique signalId (incremental or hash-based)
        uint256 signalId = ++signalCount;

        signals[signalId] = Signal({
            asset: _asset,
            action: _action,
            timeframe: _timeframe,
            priceTarget: _priceTarget,
            confidenceLevel: _confidenceLevel,
            analysis: _analysis,
            timestamp: block.timestamp
        });

        emit NewSignal(
            signalId,
            _asset,
            _action,
            _timeframe,
            _priceTarget,
            _confidenceLevel,
            _analysis
        );
    }
}
