// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract NFTBase64 is ERC721 {
    using Strings for uint256;
    using Base64 for bytes;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    _dataURI(tokenId).encode()
                )
            );
    }

    function _dataURI(uint256 tokenId) private pure returns (bytes memory) {
        return
            abi.encodePacked(
                "{",
                '"name": "Base64 #',
                tokenId.toString(),
                '"',
                "}"
            );
    }
}
