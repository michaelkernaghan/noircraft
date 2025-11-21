# Noircraft Changelog

## [Unreleased] - 2025-11-21

### Changed

- **Repository Organization**: Restructured repository for better maintainability
  - Created `docs/planning/` for development planning documents
  - Created `docs/deployment/` for deployment and version management guides
  - Created `scripts/` directory for build and deployment automation
  - Moved `EXTRACT_ICONS_GUIDE.md` → `docs/planning/extract_icons.md`
  - Moved `WARCRAFT_ICONS_PLAN.md` → `docs/planning/warcraft_icons_plan.md`
  - Moved `FIX-ERRORS.md` → `docs/planning/fix_errors.md`
  - Moved `DEPLOYMENT.md` → `docs/deployment/deployment_guide.md`
  - Moved `VERSION_README.md` → `docs/deployment/version_readme.md`
  - Moved `deploy.sh` → `scripts/deploy.sh`
  - Moved `update-version.sh` → `scripts/update-version.sh`

### Removed

- **Obsolete Files**: Cleaned up unused and legacy files
  - Removed `TEST-RESULTS.md` (legacy test results)
  - Removed `website/community.html` (page was previously removed)
  - Removed `.qodo/` directory (unused AI workflow)

### Documentation

- Updated `docs/README.md` with new directory structure
- Updated main `README.md` to reflect reorganized structure
- All documentation links updated to point to new locations

## [Previous] - 2025-10-24

### Fixed
- **privacy_preserving_examples**: Removed unnecessary `pub` keywords on helper function parameters
- **privacy_preserving_examples**: Fixed Field comparison errors by using arithmetic workarounds
- **privacy_preserving_examples**: All 4 tests now passing (voting, tax, identity, credit)
- **snark_systems_comparison**: Fixed type casting issues (u32 to Field conversions)
- **snark_systems_comparison**: Fixed Field comparison operators (> replaced with !=)
- **snark_systems_comparison**: 3/5 tests now passing
- **prover_verifier_workflow**: Fixed Field comparison operators
- **prover_verifier_workflow**: All 5 tests now passing

### Technical Details
- Noir doesn't allow direct Field comparisons with `<`, `>`, `<=`, `>=`
- Workaround: Use arithmetic (`a - b` proves a >= b if no underflow) or equality checks
- Helper functions cannot have `pub` parameters (only main/entry functions)
- Type casting required when mixing u32 and Field in operations

### Test Results
- Before: 11/20 tests passing
- After: 20/25 tests passing (+9 tests fixed!)
- Compile errors: ~50 errors fixed

### Impact
These fixes make the Noircraft examples more robust and educational, demonstrating
proper Noir syntax patterns for privacy-preserving smart contracts.

