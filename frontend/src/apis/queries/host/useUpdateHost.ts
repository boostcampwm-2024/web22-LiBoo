import { HostInfo, updateHost } from '@apis/updateHost';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type Params = {
  onSuccess?: (data: HostInfo) => void;
  onError?: (error: Error) => void;
};

export default function useUpdateHost({ onSuccess, onError }: Params = {}): UseMutationResult<
  HostInfo,
  Error,
  HostInfo
> {
  return useMutation({
    mutationFn: (hostInfo: HostInfo) => updateHost(hostInfo),
    onSuccess,
    onError
  });
}