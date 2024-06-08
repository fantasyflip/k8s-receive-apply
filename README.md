# 📦 Check new Files and apply to Kubernetes

### 📝 Description

This GitHub Action checks the files from the newest commit made by [`fantasyflip/k8s-build-transfer`](https://github.com/fantasyflip/k8s-build-transfer) github action and applies them to a Kubernetes cluster. Additionally, it can set Cloudflare DNS records based on the commit message.

## 🚀 Inputs

- **`kubeconfig`**: _Required_. Kubeconfig to access the Kubernetes cluster.
- **`commit-file-pattern`**: File pattern for `tj-actions/changed-files@v44` to filter files to be applied. _Default_: `namespace/**/*.{yaml,yml,json}`.
- **`ghcr-username`**: _Required_. GitHub Container Registry Username.
- **`ghcr-email`**: _Required_. GitHub Container Registry Email.
- **`ghcr-token`**: _Required_. GitHub Container Registry Token.
- **`gh-token`**: _Required_. GitHub Token.
- **`set-cf-dns`**: Set Cloudflare DNS. _Default_: `false`.
- **`loadbalancer-ip`**: Loadbalancer IP.
- **`cf-token`**: Cloudflare Token.
- **`cf-zone-id`**: Cloudflare Zone ID.

## 🛠️ Usage

```yaml
name: Apply Kubernetes Configs
on:
  push:
    branches:
      - main

jobs:
  apply-k8s-configs:
    if: contains(github.event.head_commit.message, '[CI]')
    runs-on: ubuntu-latest
    steps:
      - name: Check new Files and apply to Kubernetes
        uses: fantasyflip/k8s-receive-apply@main
        with:
          kubeconfig: ${{ secrets.KUBECONFIG }}
          commit-file-pattern: "namespace/**/*.{yaml,yml,json}"
          ghcr-username: ${{ secrets.GHCR_USERNAME }}
          ghcr-email: ${{ secrets.GHCR_EMAIL }}
          ghcr-token: ${{ secrets.GHCR_TOKEN }}
          gh-token: ${{ secrets.GH_TOKEN }}
          set-cf-dns: true
          loadbalancer-ip: ${{ secrets.LOADBALANCER_IP }}
          cf-token: ${{ secrets.CF_TOKEN }}
          cf-zone-id: ${{ secrets.CF_ZONE_ID }}
```

## 📝 Steps

1. **Display Inputs**:

   - Displays the input values for debugging purposes.

2. **Checkout Source Repository**:

   - Checks out the source repository to access the latest commit files.

3. **Checkout Action Repository**:

   - Checks out the action repository `fantasyflip/k8s-receive-apply`.

4. **Create Kubeconfig File**:

   - Creates a `kubeconfig.yaml` file from the provided kubeconfig input.

5. **Extract Namespace from Commit Message**:

   - Extracts the namespace from the commit message using the pattern `[N=namespace]`.

6. **Extract Hostname from Commit Message**:

   - If `set-cf-dns` is true, extracts the hostname from the commit message using the pattern `[H=hostname]`.

7. **Check Namespace**:

   - Checks if the specified namespace exists in the Kubernetes cluster. If not, it creates the namespace and adds a Docker registry secret for `ghcr.io`.

8. **Get Changed Files**:

   - Uses `tj-actions/changed-files@v44` to get the changed files based on the specified pattern.

9. **Apply Changed Files to Kubernetes**:

   - Applies the changed files to the Kubernetes cluster using `kubectl`.

10. **Set Cloudflare DNS**:
    - If `set-cf-dns` is true, creates a Cloudflare DNS record with the specified parameters.

## 🌐 Environment Variables

- **`RT_NAMESPACE`**: Extracted namespace from the commit message.
- **`RT_HOST`**: Extracted hostname from the commit message (if `set-cf-dns` is true).
- **`ALL_CHANGED_FILES`**: List of all changed files to be applied to the Kubernetes cluster.

By following this README, you can integrate and utilize the "Check new Files and apply to Kubernetes" GitHub Action in your workflow to automate the deployment of Kubernetes configurations and manage Cloudflare DNS records effectively.
