// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//UNFINISHED UNIMPLEMENTED CODE

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JotedCoin is ERC20("JotedCoin", "JTC"), Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** uint256(decimals());

    event TokensMinted(address indexed to, uint256 amount);

    modifier onlyOwnerOrUploader() {
        require(msg.sender == owner() || hasUploaderRole(msg.sender), "Not authorized");
        _;
    }
    mapping(address => bool) private uploaders;

    function grantUploaderRole(address _uploader) public onlyOwner {
        uploaders[_uploader] = true;
    }
    function revokeUploaderRole(address _uploader) public onlyOwner {
        uploaders[_uploader] = false;
    }

    function hasUploaderRole(address _address) public view returns (bool) {
        return uploaders[_address];
    }

    function mintTokens(address _to, uint256 _amount) public onlyOwnerOrUploader {
        require(totalSupply() + _amount <= MAX_SUPPLY, "Exceeds maximum supply");
        _mint(_to, _amount);
        emit TokensMinted(_to, _amount);
    }

    function burnTokens(uint256 _amount) public onlyOwner {
        _burn(msg.sender, _amount);
    }
}
